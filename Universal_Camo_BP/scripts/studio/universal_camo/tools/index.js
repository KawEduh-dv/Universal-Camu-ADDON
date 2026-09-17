import { system, world } from "@minecraft/server";
import { IDS, TOOL_IDS } from "./constants.js";
import { getMeasurePreviewPoints, measure } from "./measure.js";
import { canRotateBlock, rotateBlock } from "./rotation.js";
import { canTexturePlacement, textureWithHotbar } from "./texture_trowel.js";
import { contextReplace } from "./context_brush.js";
import { getMoverPreviewPoint, moveBlock } from "./block_mover.js";
import { canPlaceCloud, placeCloud, placeCloudAt, processCloudLifetimes } from "./cloud_bucket.js";
import { highlightBlock } from "./feedback.js";

function heldItemId(player) {
    try {
        const inventory = player.getComponent("minecraft:inventory")?.container;
        return inventory?.getItem(player.selectedSlotIndex)?.typeId;
    } catch {
        return undefined;
    }
}

function viewedHit(player) {
    try {
        return player.getBlockFromViewDirection({
            maxDistance: 6,
            includeLiquidBlocks: false,
            includePassableBlocks: true,
        });
    } catch {
        return undefined;
    }
}

world.beforeEvents.playerInteractWithBlock.subscribe(event => {
    if (event.isFirstEvent === false) return;
    const id = event.itemStack?.typeId;
    if (!TOOL_IDS.has(id)) return;
    event.cancel = true;
    const { player, block, blockFace } = event;
    system.run(() => {
        if (id === IDS.measure) measure(player, block);
        else if (id === IDS.wrench) rotateBlock(player, block);
        else if (id === IDS.trowel) textureWithHotbar(player, block, blockFace);
        else if (id === IDS.brush) contextReplace(player, block);
        else if (id === IDS.mover) moveBlock(player, block, blockFace);
        else if (id === IDS.cloudBucket) placeCloud(player, block, blockFace);
    });
});

world.afterEvents.itemUse.subscribe(event => {
    if (event.itemStack?.typeId !== IDS.cloudBucket) return;
    system.run(() => {
        const placement = canPlaceCloud(event.source);
        if (placement) placeCloudAt(event.source, placement);
    });
});

system.runInterval(() => {
    processCloudLifetimes();
    for (const player of world.getAllPlayers()) {
        const id = heldItemId(player);
        if (id === IDS.measure) {
            const preview = getMeasurePreviewPoints(player);
            if (preview?.dimensionId === player.dimension.id) {
                for (const point of preview.points) highlightBlock(player, point);
            }
            continue;
        }
        if (id === IDS.cloudBucket) {
            const placement = canPlaceCloud(player);
            if (placement?.dimension.id === player.dimension.id) highlightBlock(player, placement.location);
            continue;
        }
        if (id === IDS.mover) {
            const preview = getMoverPreviewPoint(player);
            if (preview?.dimensionId === player.dimension.id) highlightBlock(player, preview.location);
            continue;
        }
        const hit = viewedHit(player);
        const block = hit?.block;
        if (id === IDS.wrench && canRotateBlock(block)) {
            highlightBlock(player, block.location);
        } else if (id === IDS.trowel) {
            const placement = canTexturePlacement(block, hit?.face);
            if (placement?.dimension.id === player.dimension.id) highlightBlock(player, placement.location);
        }
    }
}, 2);
