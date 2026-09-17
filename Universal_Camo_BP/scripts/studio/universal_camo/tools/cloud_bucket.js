import { system } from "@minecraft/server";
import { IDS } from "./constants.js";
import { add, damageHeldTool, faceOffset, isAir } from "./utils.js";
import { failure, successEffect } from "./feedback.js";

const CLOUD_REACH = 6;
const CLOUD_AIR_DISTANCE = 5;
const CLOUD_LIFETIME_TICKS = 100;
const lastPlacementTick = new Map();
const pendingClouds = new Map();

function floorLocation(location) {
    return {
        x: Math.floor(location.x),
        y: Math.floor(location.y),
        z: Math.floor(location.z),
    };
}

function cloudKey(dimension, location) {
    return `${dimension.id}:${location.x}:${location.y}:${location.z}`;
}

function scheduleCloudRemoval(dimension, location) {
    pendingClouds.set(cloudKey(dimension, location), {
        dimension,
        location: { ...location },
        expireTick: system.currentTick + CLOUD_LIFETIME_TICKS,
    });
}

export function processCloudLifetimes() {
    for (const [key, cloud] of pendingClouds) {
        if (system.currentTick < cloud.expireTick) continue;
        try {
            const block = cloud.dimension.getBlock(cloud.location);
            if (!block) continue;
            if (block?.typeId === IDS.cloudBlock) block.setType("minecraft:air");
            pendingClouds.delete(key);
        } catch {}
    }
}

function isOnPlacementCooldown(player) {
    const lastTick = lastPlacementTick.get(player.id) ?? -20;
    return system.currentTick - lastTick < 2;
}

function markPlaced(player) {
    lastPlacementTick.set(player.id, system.currentTick);
}

export function getCloudPlacement(player, clickedBlock = undefined, face = undefined) {
    if (clickedBlock && face) {
        return {
            dimension: clickedBlock.dimension,
            location: add(clickedBlock.location, faceOffset(face)),
        };
    }
    try {
        const hit = player.getBlockFromViewDirection({
            maxDistance: CLOUD_REACH,
            includeLiquidBlocks: false,
            includePassableBlocks: true,
        });
        if (hit?.block && !isAir(hit.block) && hit.face) {
            return {
                dimension: hit.block.dimension,
                location: add(hit.block.location, faceOffset(hit.face)),
            };
        }
    } catch {}
    try {
        const head = player.getHeadLocation();
        const view = player.getViewDirection();
        return {
            dimension: player.dimension,
            location: floorLocation({
                x: head.x + view.x * CLOUD_AIR_DISTANCE,
                y: head.y + view.y * CLOUD_AIR_DISTANCE,
                z: head.z + view.z * CLOUD_AIR_DISTANCE,
            }),
        };
    } catch {
        return undefined;
    }
}

export function canPlaceCloud(player) {
    const placement = getCloudPlacement(player);
    if (!placement) return undefined;
    try {
        const destination = placement.dimension.getBlock(placement.location);
        if (destination && isAir(destination)) return placement;
    } catch {}
    return undefined;
}

export function placeCloudAt(player, placement) {
    if (!placement || isOnPlacementCooldown(player)) return false;
    const destination = placement.dimension.getBlock(placement.location);
    if (!destination || !isAir(destination)) {
        return false;
    }
    try {
        destination.setType(IDS.cloudBlock);
        scheduleCloudRemoval(placement.dimension, placement.location);
        markPlaced(player);
        damageHeldTool(player);
        try {
            placement.dimension.playSound("mob.shulker.teleport", {
                x: placement.location.x + 0.5,
                y: placement.location.y + 0.5,
                z: placement.location.z + 0.5,
            }, { volume: 0.65, pitch: 1.3 });
        } catch {}
        successEffect(player, placement.location);
        return true;
    } catch {
        failure(player, "kedu.tool.failed");
        return false;
    }
}

export function placeCloud(player, clickedBlock, face) {
    placeCloudAt(player, getCloudPlacement(player, clickedBlock, face));
}
