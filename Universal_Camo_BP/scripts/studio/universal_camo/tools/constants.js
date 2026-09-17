export const IDS = Object.freeze({
    measure: "kedu:measuring_tape",
    wrench: "kedu:copper_wrench",
    trowel: "kedu:texture_trowel",
    brush: "kedu:context_brush",
    mover: "kedu:block_mover",
    cloudBucket: "kedu:cloud_bucket",
    cloudBlock: "kedu:cloud_block",
});

export const TOOL_IDS = new Set(Object.values(IDS).filter(id => id !== IDS.cloudBlock));
export const NEIGHBORS = Object.freeze([
    { x: 1, y: 0, z: 0 }, { x: -1, y: 0, z: 0 },
    { x: 0, y: 1, z: 0 }, { x: 0, y: -1, z: 0 },
    { x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: -1 },
]);

export const UNSAFE_BLOCK_IDS = new Set([
    "minecraft:air", "minecraft:cave_air", "minecraft:void_air",
    "minecraft:bedrock", "minecraft:barrier", "minecraft:structure_void",
    "minecraft:command_block", "minecraft:chain_command_block", "minecraft:repeating_command_block",
    "minecraft:end_portal", "minecraft:end_portal_frame", "minecraft:portal",
    "minecraft:nether_portal", "minecraft:structure_block", "minecraft:jigsaw",
    "minecraft:moving_block", "minecraft:piston_arm_collision", "minecraft:sticky_piston_arm_collision",
    "minecraft:mob_spawner", "minecraft:trial_spawner", "minecraft:vault",
]);

export const UNSAFE_BLOCK_FRAGMENTS = Object.freeze([
    "chest", "shulker_box", "furnace", "smoker", "blast_furnace", "hopper",
    "dispenser", "dropper", "barrel", "brewing_stand", "lectern", "beehive",
    "bee_nest", "sign", "skull", "head", "banner", "bed", "flower_pot",
    "decorated_pot", "crafter", "jukebox", "campfire", "comparator",
]);
