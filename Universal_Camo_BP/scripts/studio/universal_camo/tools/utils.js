import {
    BlockPermutation, EntityComponentTypes, GameMode, ItemComponentTypes, ItemStack,
} from "@minecraft/server";
import { MATERIALS, parseCamoBlock } from "../../../camo_core.js";
import { TOOL_IDS, UNSAFE_BLOCK_FRAGMENTS, UNSAFE_BLOCK_IDS } from "./constants.js";

export function inventory(player) {
    return player.getComponent(EntityComponentTypes.Inventory)?.container;
}

export function isCreative(player) {
    return player.getGameMode() === GameMode.Creative;
}

export function isAir(block) {
    return !block || block.typeId === "minecraft:air" || block.typeId === "minecraft:cave_air" || block.typeId === "minecraft:void_air";
}

export function add(a, b) {
    return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

export function faceOffset(face) {
    const key = String(face).toLowerCase();
    if (key.includes("up")) return { x: 0, y: 1, z: 0 };
    if (key.includes("down")) return { x: 0, y: -1, z: 0 };
    if (key.includes("north")) return { x: 0, y: 0, z: -1 };
    if (key.includes("south")) return { x: 0, y: 0, z: 1 };
    if (key.includes("east")) return { x: 1, y: 0, z: 0 };
    return { x: -1, y: 0, z: 0 };
}

export function isUnsafe(typeId) {
    if (!typeId || UNSAFE_BLOCK_IDS.has(typeId)) return true;
    return UNSAFE_BLOCK_FRAGMENTS.some(fragment => typeId.includes(fragment));
}

export function baseDropId(typeId) {
    return parseCamoBlock(typeId)?.baseId ?? typeId;
}

export function findAndConsume(player, typeId) {
    if (isCreative(player)) return true;
    const box = inventory(player);
    if (!box) return false;
    for (let slot = 0; slot < box.size; slot++) {
        const stack = box.getItem(slot);
        if (stack?.typeId !== typeId) continue;
        if (stack.amount > 1) {
            stack.amount--;
            box.setItem(slot, stack);
        } else {
            box.setItem(slot);
        }
        return true;
    }
    return false;
}

export function returnBlockItem(player, typeId, location) {
    if (isCreative(player) || isUnsafe(typeId)) return;
    let stack;
    try {
        stack = new ItemStack(baseDropId(typeId), 1);
    } catch {
        return;
    }
    const leftover = inventory(player)?.addItem(stack);
    if (leftover) {
        player.dimension.spawnItem(leftover, { x: location.x + 0.5, y: location.y + 0.5, z: location.z + 0.5 });
    }
}

export function damageHeldTool(player) {
    if (isCreative(player)) return;
    const box = inventory(player);
    const slot = player.selectedSlotIndex;
    const stack = box?.getItem(slot);
    if (!box || !stack || !TOOL_IDS.has(stack.typeId)) return;
    const durability = stack.getComponent(ItemComponentTypes.Durability);
    if (!durability) return;
    const enchantable = stack.getComponent(ItemComponentTypes.Enchantable);
    const level = enchantable?.getEnchantment("unbreaking")?.level ?? 0;
    let chance = 100;
    try { chance = durability.getDamageChance(level); } catch {}
    if (Math.random() * 100 >= chance) return;
    if (durability.damage + 1 >= durability.maxDurability) {
        box.setItem(slot);
        try { player.playSound("random.break"); } catch {}
        return;
    }
    durability.damage++;
    box.setItem(slot, stack);
}

export function resolvePermutation(typeId, states = undefined) {
    try { return BlockPermutation.resolve(typeId, states); } catch { return undefined; }
}

export function blockPlaceSound(typeId, permutation = undefined) {
    const direct = MATERIALS.get(typeId)?.placeSound;
    if (direct) return direct;
    const camo = parseCamoBlock(typeId);
    if (camo) {
        const material = permutation?.getState?.("kedu:material") ?? 0;
        for (const entry of MATERIALS.values()) {
            const mapping = entry[camo.shape];
            if (mapping?.bank === camo.bank && mapping.index === material) return entry.placeSound;
        }
    }
    const id = String(typeId ?? "").toLowerCase();
    if (/(planks|wood|log|stem|hyphae|bamboo|fence|door|trapdoor)/.test(id)) return "place.wood";
    if (/(grass|leaves|moss|vine)/.test(id)) return "place.grass";
    if (/(sand|gravel|concrete_powder)/.test(id)) return "place.sand";
    if (/(wool|carpet)/.test(id)) return "place.cloth";
    if (/(glass|ice)/.test(id)) return "place.glass";
    if (/(copper|iron|gold|metal)/.test(id)) return "place.metal";
    return "place.stone";
}

export function playBlockSound(dimension, typeId, permutation, location, pitch = 1) {
    try {
        dimension.playSound(blockPlaceSound(typeId, permutation), {
            x: location.x + 0.5,
            y: location.y + 0.5,
            z: location.z + 0.5,
        }, { volume: 0.9, pitch });
    } catch {}
}
