import { BlockPermutation } from "@minecraft/server";
import { refreshConnections } from "../../../camo_core.js";
import { add, damageHeldTool, faceOffset, isAir, isUnsafe, playBlockSound } from "./utils.js";
import { failure, selectedEffect, successEffect } from "./feedback.js";

const selections = new Map();

export function moveBlock(player, clickedBlock, face) {
    const current = selections.get(player.id);
    if (current && player.isSneaking) {
        selections.delete(player.id);
        selectedEffect(player);
        return;
    }
    if (!current) {
        if (isUnsafe(clickedBlock.typeId)) {
            failure(player, "kedu.tool.unsafe");
            return;
        }
        selections.set(player.id, {
            dimensionId: clickedBlock.dimension.id,
            location: { ...clickedBlock.location },
            typeId: clickedBlock.typeId,
            states: clickedBlock.permutation.getAllStates(),
        });
        selectedEffect(player, clickedBlock.location);
        return;
    }
    if (current.dimensionId !== clickedBlock.dimension.id) {
        failure(player, "kedu.tool.mover.dimension");
        return;
    }
    const destinationLocation = add(clickedBlock.location, faceOffset(face));
    if (Math.abs(destinationLocation.x - current.location.x) > 16 ||
        Math.abs(destinationLocation.y - current.location.y) > 16 ||
        Math.abs(destinationLocation.z - current.location.z) > 16) {
        failure(player, "kedu.tool.mover.range");
        return;
    }
    const dimension = clickedBlock.dimension;
    const source = dimension.getBlock(current.location);
    const destination = dimension.getBlock(destinationLocation);
    if (!source || source.typeId !== current.typeId ||
        JSON.stringify(source.permutation.getAllStates()) !== JSON.stringify(current.states)) {
        selections.delete(player.id);
        failure(player, "kedu.tool.mover.changed");
        return;
    }
    if (!destination || !isAir(destination)) {
        failure(player, "kedu.tool.mover.blocked");
        return;
    }
    const permutation = (() => {
        try { return BlockPermutation.resolve(current.typeId, current.states); } catch { return undefined; }
    })();
    if (!permutation) {
        selections.delete(player.id);
        failure(player, "kedu.tool.failed");
        return;
    }
    try {
        destination.setPermutation(permutation);
        const placed = dimension.getBlock(destinationLocation);
        if (!placed || placed.typeId !== current.typeId) throw new Error("destination verification failed");
        source.setType("minecraft:air");
        if (dimension.getBlock(current.location)?.typeId !== "minecraft:air") {
            placed.setType("minecraft:air");
            throw new Error("source removal failed");
        }
        refreshConnections(dimension, current.location);
        refreshConnections(dimension, destinationLocation);
        playBlockSound(dimension, current.typeId, permutation, destinationLocation);
        selections.delete(player.id);
        damageHeldTool(player);
        successEffect(player, destinationLocation);
    } catch {
        failure(player, "kedu.tool.failed");
    }
}

export function getMoverPreviewPoint(player) {
    return selections.get(player.id);
}
