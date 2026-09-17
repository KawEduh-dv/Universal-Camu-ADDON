import { system } from "@minecraft/server";

const POWERED_STATE = "kedu:powered";
const pendingOff = new Map();

function lampKey(block) {
    const { x, y, z } = block.location;
    return `${block.dimension.id}:${x},${y},${z}`;
}

function isLamp(block) {
    return typeof block?.permutation.getState(POWERED_STATE) === "boolean";
}

function updateLampPower(block, power) {
    if (!isLamp(block)) return;
    const key = lampKey(block);
    if (power > 0) {
        pendingOff.delete(key);
        if (!block.permutation.getState(POWERED_STATE)) {
            block.setPermutation(block.permutation.withState(POWERED_STATE, true));
        }
        return;
    }
    if (!block.permutation.getState(POWERED_STATE)) {
        pendingOff.delete(key);
        return;
    }
    if (pendingOff.has(key)) return;
    const token = {};
    pendingOff.set(key, token);
    const location = { ...block.location };
    const dimension = block.dimension;
    const typeId = block.typeId;
    system.runTimeout(() => {
        if (pendingOff.get(key) !== token) return;
        pendingOff.delete(key);
        try {
            const current = dimension.getBlock(location);
            if (current?.typeId !== typeId || !isLamp(current)) return;
            if ((current.getRedstonePower() ?? 0) > 0) return;
            current.setPermutation(current.permutation.withState(POWERED_STATE, false));
        } catch {}
    }, 4);
}

export function refreshLampPower(block) {
    if (!isLamp(block)) return;
    updateLampPower(block, block.getRedstonePower() ?? 0);
}

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent("kedu:redstone_lamp", {
        onRedstoneUpdate({ block, powerLevel }) {
            updateLampPower(block, powerLevel);
        },
        onPlace({ block }) {
            refreshLampPower(block);
        },
        onBreak({ block }) {
            pendingOff.delete(lampKey(block));
        },
    });
});
