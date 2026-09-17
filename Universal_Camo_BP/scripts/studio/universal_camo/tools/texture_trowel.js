import { ItemStack } from "@minecraft/server";
import {
    add, faceOffset, inventory, damageHeldTool, isAir, isCreative, isUnsafe, playBlockSound, resolvePermutation,
} from "./utils.js";
import { failure, successEffect } from "./feedback.js";

function isPaletteBlock(typeId) {
    if (!typeId || typeId.startsWith("kedu:") || isUnsafe(typeId)) return false;
    return !!resolvePermutation(typeId);
}

function consumePaletteChoice(player, choice) {
    if (isCreative(player)) return true;
    try {
        const box = inventory(player);
        const stack = box?.getItem(choice.slot);
        if (!box || stack?.typeId !== choice.typeId || stack.amount < 1) return false;
        if (stack.amount > 1) {
            stack.amount--;
            box.setItem(choice.slot, stack);
        } else {
            box.setItem(choice.slot);
        }
        return true;
    } catch {
        return false;
    }
}

export function getHotbarBlockChoices(player) {
    const box = inventory(player);
    const choices = [];
    for (let slot = 0; box && slot < Math.min(9, box.size); slot++) {
        const stack = box.getItem(slot);
        if (!stack || !isPaletteBlock(stack.typeId)) continue;
        const permutation = resolvePermutation(stack.typeId);
        if (permutation) choices.push({ slot, typeId: stack.typeId, permutation });
    }
    return choices;
}

export function getTrowelPlacement(target, face) {
    if (!target || isAir(target) || !face) return undefined;
    const location = add(target.location, faceOffset(face));
    return { dimension: target.dimension, location };
}

export function canTexturePlacement(target, face) {
    const placement = getTrowelPlacement(target, face);
    if (!placement) return undefined;
    try {
        const destination = placement.dimension.getBlock(placement.location);
        if (destination && isAir(destination)) return placement;
    } catch {}
    return undefined;
}

export function textureWithHotbar(player, target, face) {
    const placement = canTexturePlacement(target, face);
    if (!placement) return;
    const choices = getHotbarBlockChoices(player);
    if (!choices.length) return;
    const choice = choices[Math.floor(Math.random() * choices.length)];
    if (!consumePaletteChoice(player, choice)) return;
    let placed = false;
    try {
        const destination = placement.dimension.getBlock(placement.location);
        if (!destination || !isAir(destination)) throw new Error("destination blocked");
        destination.setPermutation(choice.permutation);
        placed = true;
        playBlockSound(placement.dimension, choice.typeId, choice.permutation, placement.location);
        damageHeldTool(player);
        successEffect(player, placement.location);
    } catch {
        if (!placed && !isCreative(player)) {
            try { inventory(player)?.addItem(new ItemStack(choice.typeId, 1)); } catch {}
        }
        failure(player, "kedu.tool.failed");
    }
}
