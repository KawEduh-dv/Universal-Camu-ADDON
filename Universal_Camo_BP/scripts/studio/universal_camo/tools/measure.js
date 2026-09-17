import { system } from "@minecraft/server";
import { selected, success } from "./feedback.js";

const measurements = new Map();
const completedMeasurements = new Map();

export function measure(player, block) {
    const point = { ...block.location };
    const first = measurements.get(player.id);
    if (!first || first.dimensionId !== block.dimension.id) {
        measurements.set(player.id, { ...point, dimensionId: block.dimension.id });
        completedMeasurements.delete(player.id);
        selected(player, "kedu.tool.measure.first", [point.x, point.y, point.z], point);
        return;
    }
    measurements.delete(player.id);
    const dx = Math.abs(point.x - first.x);
    const dy = Math.abs(point.y - first.y);
    const dz = Math.abs(point.z - first.z);
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz).toFixed(2);
    completedMeasurements.set(player.id, {
        dimensionId: block.dimension.id,
        untilTick: system.currentTick + 10,
        points: [{ x: first.x, y: first.y, z: first.z }, point],
    });
    success(player, "kedu.tool.measure.result", [distance, dx, dy, dz, dx + 1, dy + 1, dz + 1], point);
}

export function getMeasurePreviewPoints(player) {
    const completed = completedMeasurements.get(player.id);
    if (completed) {
        if (system.currentTick <= completed.untilTick) return completed;
        completedMeasurements.delete(player.id);
    }
    const first = measurements.get(player.id);
    if (!first) return undefined;
    return {
        dimensionId: first.dimensionId,
        points: [{ x: first.x, y: first.y, z: first.z }],
    };
}
