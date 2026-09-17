import { damageHeldTool, playBlockSound } from "./utils.js";
import { failure, successEffect } from "./feedback.js";

function cycle(value, values) {
    const index = values.indexOf(value);
    return values[(index < 0 ? 0 : index + 1) % values.length];
}

function getRotatedPermutation(block) {
    const states = block.permutation.getAllStates();
    const strategies = [
        ["minecraft:cardinal_direction", ["north", "east", "south", "west"]],
        ["cardinal_direction", ["north", "east", "south", "west"]],
        ["minecraft:facing_direction", [2, 5, 3, 4, 1, 0]],
        ["facing_direction", [2, 5, 3, 4, 1, 0]],
        ["minecraft:weirdo_direction", [0, 1, 2, 3]],
        ["weirdo_direction", [0, 1, 2, 3]],
        ["minecraft:direction", [0, 1, 2, 3]],
        ["direction", [0, 1, 2, 3]],
        ["minecraft:pillar_axis", ["x", "z", "y"]],
        ["pillar_axis", ["x", "z", "y"]],
        ["minecraft:block_face", ["north", "east", "south", "west", "up", "down"]],
    ];
    let next = block.permutation;
    let changed = false;
    for (const [name, values] of strategies) {
        if (!(name in states)) continue;
        try {
            next = next.withState(name, cycle(states[name], values));
            changed = true;
            break;
        } catch {}
    }
    if (!changed) {
        for (const name of ["minecraft:ground_sign_direction", "ground_sign_direction"]) {
            if (!(name in states)) continue;
            try {
                next = next.withState(name, (Number(states[name]) + 4) % 16);
                changed = true;
                break;
            } catch {}
        }
    }
    if (!changed) {
        for (const name of ["minecraft:vertical_half", "vertical_half"]) {
            if (!(name in states)) continue;
            try {
                next = next.withState(name, states[name] === "top" ? "bottom" : "top");
                changed = true;
                break;
            } catch {}
        }
    }
    return changed ? next : undefined;
}

export function canRotateBlock(block) {
    if (!block) return false;
    return !!getRotatedPermutation(block);
}

export function rotateBlock(player, block) {
    const next = getRotatedPermutation(block);
    if (!next) {
        failure(player, "kedu.tool.rotate.unsupported");
        return;
    }
    try {
        block.setPermutation(next);
        playBlockSound(block.dimension, block.typeId, next, block.location, 1.05);
        damageHeldTool(player);
        successEffect(player, block.location);
    } catch {
        failure(player, "kedu.tool.failed");
    }
}
