import { refreshConnections } from "../../../camo_core.js";
import { NEIGHBORS } from "./constants.js";
import { add, baseDropId, damageHeldTool, findAndConsume, isAir, isUnsafe, playBlockSound, returnBlockItem } from "./utils.js";
import { failure, successEffect } from "./feedback.js";

export function contextReplace(player, target) {
    if (isUnsafe(target.typeId)) {
        failure(player, "kedu.tool.unsafe");
        return;
    }
    const nearby = [];
    for (const offset of NEIGHBORS) {
        const block = target.dimension.getBlock(add(target.location, offset));
        if (!block || isAir(block) || block.typeId === target.typeId || isUnsafe(block.typeId)) continue;
        nearby.push(block);
    }
    if (!nearby.length) {
        failure(player, "kedu.tool.brush.no_context");
        return;
    }
    const types = new Map();
    for (const block of nearby) types.set(block.typeId, (types.get(block.typeId) ?? 0) + 1);
    const winner = [...types].sort((a, b) => b[1] - a[1])[0][0];
    const candidates = nearby.filter(block => block.typeId === winner);
    const variants = new Map();
    for (const block of candidates) {
        const key = JSON.stringify(block.permutation.getAllStates());
        const entry = variants.get(key) ?? { count: 0, permutation: block.permutation };
        entry.count++;
        variants.set(key, entry);
    }
    const replacement = [...variants.values()].sort((a, b) => b.count - a.count)[0].permutation;
    const requiredId = baseDropId(winner);
    if (!findAndConsume(player, requiredId)) {
        failure(player, "kedu.tool.brush.need_block", [requiredId]);
        return;
    }
    const previousId = target.typeId;
    const location = { ...target.location };
    try {
        target.setPermutation(replacement);
        playBlockSound(target.dimension, winner, replacement, location);
        returnBlockItem(player, previousId, location);
        refreshConnections(target.dimension, location);
        damageHeldTool(player);
        successEffect(player, location);
    } catch {
        failure(player, "kedu.tool.failed");
    }
}
