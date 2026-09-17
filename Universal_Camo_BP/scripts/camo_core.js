import { BlockPermutation, GameMode, ItemStack, system, world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { refreshLampPower } from "./redstone_lamp.js";

const MATERIAL_STATE = "kedu:material";
const SHAPE_STATE = "kedu:shape";
const TRAPDOOR_STATE = "kedu:trapdoor_state";
const TOOL_ID = "kedu:camo_scraper";
const MANUAL_ID = "kedu:camo_manual";
const COMPATIBLE_VANILLA_BLOCKS = 401;
const COMPATIBLE_BLOCK_IDS = [
    "minecraft:acacia_door",
    "minecraft:acacia_double_slab",
    "minecraft:acacia_fence",
    "minecraft:acacia_fence_gate",
    "minecraft:acacia_planks",
    "minecraft:acacia_slab",
    "minecraft:acacia_stairs",
    "minecraft:acacia_wood",
    "minecraft:amethyst_block",
    "minecraft:andesite",
    "minecraft:andesite_double_slab",
    "minecraft:andesite_slab",
    "minecraft:andesite_stairs",
    "minecraft:andesite_wall",
    "minecraft:bamboo_double_slab",
    "minecraft:bamboo_planks",
    "minecraft:bamboo_slab",
    "minecraft:bamboo_stairs",
    "minecraft:basalt",
    "minecraft:bed",
    "minecraft:birch_door",
    "minecraft:birch_double_slab",
    "minecraft:birch_fence",
    "minecraft:birch_fence_gate",
    "minecraft:birch_log",
    "minecraft:birch_planks",
    "minecraft:birch_slab",
    "minecraft:birch_stairs",
    "minecraft:birch_wood",
    "minecraft:black_carpet",
    "minecraft:black_concrete",
    "minecraft:black_stained_glass",
    "minecraft:black_wool",
    "minecraft:blackstone",
    "minecraft:blue_carpet",
    "minecraft:blue_concrete",
    "minecraft:blue_stained_glass",
    "minecraft:blue_wool",
    "minecraft:brick_block",
    "minecraft:brick_double_slab",
    "minecraft:brick_slab",
    "minecraft:brick_stairs",
    "minecraft:brick_wall",
    "minecraft:brown_carpet",
    "minecraft:brown_concrete",
    "minecraft:brown_stained_glass",
    "minecraft:brown_wool",
    "minecraft:calcite",
    "minecraft:carpet",
    "minecraft:cherry_double_slab",
    "minecraft:cherry_fence",
    "minecraft:cherry_fence_gate",
    "minecraft:cherry_planks",
    "minecraft:cherry_slab",
    "minecraft:cherry_stairs",
    "minecraft:cherry_wood",
    "minecraft:cinnabar",
    "minecraft:cinnabar_brick_double_slab",
    "minecraft:cinnabar_brick_slab",
    "minecraft:cinnabar_brick_stairs",
    "minecraft:cinnabar_brick_wall",
    "minecraft:cinnabar_bricks",
    "minecraft:cinnabar_double_slab",
    "minecraft:cinnabar_slab",
    "minecraft:cinnabar_stairs",
    "minecraft:cinnabar_wall",
    "minecraft:coal_block",
    "minecraft:cobbled_deepslate",
    "minecraft:cobbled_deepslate_double_slab",
    "minecraft:cobbled_deepslate_slab",
    "minecraft:cobbled_deepslate_stairs",
    "minecraft:cobbled_deepslate_wall",
    "minecraft:cobblestone",
    "minecraft:cobblestone_double_slab",
    "minecraft:cobblestone_slab",
    "minecraft:cobblestone_wall",
    "minecraft:concrete",
    "minecraft:copper_block",
    "minecraft:copper_golem_statue",
    "minecraft:copper_grate",
    "minecraft:crimson_double_slab",
    "minecraft:crimson_fence",
    "minecraft:crimson_fence_gate",
    "minecraft:crimson_hyphae",
    "minecraft:crimson_planks",
    "minecraft:crimson_slab",
    "minecraft:crimson_stairs",
    "minecraft:cyan_carpet",
    "minecraft:cyan_concrete",
    "minecraft:cyan_stained_glass",
    "minecraft:cyan_wool",
    "minecraft:dark_oak_door",
    "minecraft:dark_oak_double_slab",
    "minecraft:dark_oak_fence",
    "minecraft:dark_oak_fence_gate",
    "minecraft:dark_oak_planks",
    "minecraft:dark_oak_slab",
    "minecraft:dark_oak_stairs",
    "minecraft:dark_oak_wood",
    "minecraft:dark_prismarine",
    "minecraft:dark_prismarine_double_slab",
    "minecraft:dark_prismarine_slab",
    "minecraft:dark_prismarine_stairs",
    "minecraft:deepslate",
    "minecraft:deepslate_brick_double_slab",
    "minecraft:deepslate_brick_slab",
    "minecraft:deepslate_brick_stairs",
    "minecraft:deepslate_brick_wall",
    "minecraft:deepslate_bricks",
    "minecraft:deepslate_tile_double_slab",
    "minecraft:deepslate_tile_slab",
    "minecraft:deepslate_tile_stairs",
    "minecraft:deepslate_tile_wall",
    "minecraft:deepslate_tiles",
    "minecraft:diamond_block",
    "minecraft:diorite",
    "minecraft:diorite_double_slab",
    "minecraft:diorite_slab",
    "minecraft:diorite_stairs",
    "minecraft:diorite_wall",
    "minecraft:dirt",
    "minecraft:double_stone_slab2",
    "minecraft:double_stone_slab3",
    "minecraft:double_stone_slab4",
    "minecraft:double_wooden_slab",
    "minecraft:emerald_block",
    "minecraft:end_brick_stairs",
    "minecraft:end_bricks",
    "minecraft:end_stone",
    "minecraft:end_stone_brick_double_slab",
    "minecraft:end_stone_brick_slab",
    "minecraft:end_stone_brick_wall",
    "minecraft:fence",
    "minecraft:fence_gate",
    "minecraft:glass",
    "minecraft:glowstone",
    "minecraft:gold_block",
    "minecraft:granite",
    "minecraft:granite_double_slab",
    "minecraft:granite_slab",
    "minecraft:granite_stairs",
    "minecraft:granite_wall",
    "minecraft:grass",
    "minecraft:grass_block",
    "minecraft:gray_carpet",
    "minecraft:gray_concrete",
    "minecraft:gray_stained_glass",
    "minecraft:gray_wool",
    "minecraft:green_carpet",
    "minecraft:green_concrete",
    "minecraft:green_stained_glass",
    "minecraft:green_wool",
    "minecraft:infested_cobblestone",
    "minecraft:infested_deepslate",
    "minecraft:infested_mossy_stone_bricks",
    "minecraft:infested_stone",
    "minecraft:infested_stone_bricks",
    "minecraft:invisible_bedrock",
    "minecraft:iron_bars",
    "minecraft:iron_block",
    "minecraft:iron_door",
    "minecraft:jungle_door",
    "minecraft:jungle_double_slab",
    "minecraft:jungle_fence",
    "minecraft:jungle_fence_gate",
    "minecraft:jungle_planks",
    "minecraft:jungle_slab",
    "minecraft:jungle_stairs",
    "minecraft:jungle_wood",
    "minecraft:lapis_block",
    "minecraft:light_blue_carpet",
    "minecraft:light_blue_concrete",
    "minecraft:light_blue_stained_glass",
    "minecraft:light_blue_wool",
    "minecraft:light_gray_carpet",
    "minecraft:light_gray_concrete",
    "minecraft:light_gray_stained_glass",
    "minecraft:light_gray_wool",
    "minecraft:lime_carpet",
    "minecraft:lime_concrete",
    "minecraft:lime_stained_glass",
    "minecraft:lime_wool",
    "minecraft:lit_redstone_lamp",
    "minecraft:log",
    "minecraft:magenta_carpet",
    "minecraft:magenta_concrete",
    "minecraft:magenta_stained_glass",
    "minecraft:magenta_wool",
    "minecraft:mangrove_double_slab",
    "minecraft:mangrove_fence",
    "minecraft:mangrove_fence_gate",
    "minecraft:mangrove_planks",
    "minecraft:mangrove_slab",
    "minecraft:mangrove_stairs",
    "minecraft:mangrove_wood",
    "minecraft:mob_spawner",
    "minecraft:monster_egg",
    "minecraft:mossy_cobblestone",
    "minecraft:mossy_cobblestone_double_slab",
    "minecraft:mossy_cobblestone_slab",
    "minecraft:mossy_cobblestone_stairs",
    "minecraft:mossy_cobblestone_wall",
    "minecraft:mossy_stone_brick_double_slab",
    "minecraft:mossy_stone_brick_slab",
    "minecraft:mossy_stone_brick_stairs",
    "minecraft:mossy_stone_brick_wall",
    "minecraft:mossy_stone_bricks",
    "minecraft:mud_brick_double_slab",
    "minecraft:mud_brick_slab",
    "minecraft:mud_brick_stairs",
    "minecraft:mud_brick_wall",
    "minecraft:mud_bricks",
    "minecraft:nether_brick",
    "minecraft:nether_brick_double_slab",
    "minecraft:nether_brick_fence",
    "minecraft:nether_brick_slab",
    "minecraft:nether_brick_stairs",
    "minecraft:nether_brick_wall",
    "minecraft:netherrack",
    "minecraft:normal_stone_double_slab",
    "minecraft:normal_stone_slab",
    "minecraft:normal_stone_stairs",
    "minecraft:oak_double_slab",
    "minecraft:oak_fence",
    "minecraft:oak_log",
    "minecraft:oak_planks",
    "minecraft:oak_slab",
    "minecraft:oak_stairs",
    "minecraft:oak_wood",
    "minecraft:obsidian",
    "minecraft:orange_carpet",
    "minecraft:orange_concrete",
    "minecraft:orange_stained_glass",
    "minecraft:orange_wool",
    "minecraft:packed_ice",
    "minecraft:pale_oak_double_slab",
    "minecraft:pale_oak_fence",
    "minecraft:pale_oak_fence_gate",
    "minecraft:pale_oak_planks",
    "minecraft:pale_oak_slab",
    "minecraft:pale_oak_stairs",
    "minecraft:pale_oak_wood",
    "minecraft:petrified_oak_double_slab",
    "minecraft:petrified_oak_slab",
    "minecraft:pink_carpet",
    "minecraft:pink_concrete",
    "minecraft:pink_stained_glass",
    "minecraft:pink_wool",
    "minecraft:planks",
    "minecraft:polished_andesite",
    "minecraft:polished_andesite_double_slab",
    "minecraft:polished_andesite_slab",
    "minecraft:polished_andesite_stairs",
    "minecraft:polished_blackstone",
    "minecraft:polished_blackstone_brick_double_slab",
    "minecraft:polished_blackstone_brick_slab",
    "minecraft:polished_blackstone_brick_stairs",
    "minecraft:polished_blackstone_brick_wall",
    "minecraft:polished_blackstone_bricks",
    "minecraft:polished_blackstone_double_slab",
    "minecraft:polished_blackstone_slab",
    "minecraft:polished_blackstone_stairs",
    "minecraft:polished_blackstone_wall",
    "minecraft:polished_deepslate",
    "minecraft:polished_deepslate_double_slab",
    "minecraft:polished_deepslate_slab",
    "minecraft:polished_deepslate_stairs",
    "minecraft:polished_deepslate_wall",
    "minecraft:polished_diorite",
    "minecraft:polished_diorite_double_slab",
    "minecraft:polished_diorite_slab",
    "minecraft:polished_diorite_stairs",
    "minecraft:polished_granite",
    "minecraft:polished_granite_double_slab",
    "minecraft:polished_granite_slab",
    "minecraft:polished_granite_stairs",
    "minecraft:polished_tuff",
    "minecraft:polished_tuff_double_slab",
    "minecraft:polished_tuff_slab",
    "minecraft:polished_tuff_stairs",
    "minecraft:polished_tuff_wall",
    "minecraft:prismarine",
    "minecraft:prismarine_brick_double_slab",
    "minecraft:prismarine_brick_slab",
    "minecraft:prismarine_bricks",
    "minecraft:prismarine_bricks_stairs",
    "minecraft:prismarine_double_slab",
    "minecraft:prismarine_slab",
    "minecraft:prismarine_stairs",
    "minecraft:prismarine_wall",
    "minecraft:purple_carpet",
    "minecraft:purple_concrete",
    "minecraft:purple_stained_glass",
    "minecraft:purple_wool",
    "minecraft:quartz_block",
    "minecraft:quartz_double_slab",
    "minecraft:quartz_slab",
    "minecraft:quartz_stairs",
    "minecraft:red_carpet",
    "minecraft:red_concrete",
    "minecraft:red_nether_brick",
    "minecraft:red_nether_brick_double_slab",
    "minecraft:red_nether_brick_slab",
    "minecraft:red_nether_brick_stairs",
    "minecraft:red_nether_brick_wall",
    "minecraft:red_sandstone",
    "minecraft:red_sandstone_double_slab",
    "minecraft:red_sandstone_slab",
    "minecraft:red_sandstone_stairs",
    "minecraft:red_stained_glass",
    "minecraft:red_wool",
    "minecraft:redstone_block",
    "minecraft:redstone_lamp",
    "minecraft:resin_block",
    "minecraft:resin_brick_double_slab",
    "minecraft:resin_brick_slab",
    "minecraft:resin_brick_stairs",
    "minecraft:resin_brick_wall",
    "minecraft:resin_bricks",
    "minecraft:sandstone",
    "minecraft:sandstone_double_slab",
    "minecraft:sandstone_slab",
    "minecraft:sandstone_stairs",
    "minecraft:sea_lantern",
    "minecraft:smooth_basalt",
    "minecraft:snow",
    "minecraft:snow_layer",
    "minecraft:spruce_door",
    "minecraft:spruce_double_slab",
    "minecraft:spruce_fence",
    "minecraft:spruce_fence_gate",
    "minecraft:spruce_log",
    "minecraft:spruce_planks",
    "minecraft:spruce_slab",
    "minecraft:spruce_stairs",
    "minecraft:spruce_wood",
    "minecraft:stained_glass",
    "minecraft:stone",
    "minecraft:stone_brick_double_slab",
    "minecraft:stone_brick_slab",
    "minecraft:stone_brick_stairs",
    "minecraft:stone_brick_wall",
    "minecraft:stone_bricks",
    "minecraft:stone_slab2",
    "minecraft:stone_slab3",
    "minecraft:stone_slab4",
    "minecraft:stone_stairs",
    "minecraft:stonebrick",
    "minecraft:stripped_acacia_wood",
    "minecraft:stripped_birch_wood",
    "minecraft:stripped_cherry_wood",
    "minecraft:stripped_crimson_hyphae",
    "minecraft:stripped_dark_oak_wood",
    "minecraft:stripped_jungle_wood",
    "minecraft:stripped_mangrove_wood",
    "minecraft:stripped_oak_wood",
    "minecraft:stripped_pale_oak_wood",
    "minecraft:stripped_spruce_wood",
    "minecraft:stripped_warped_hyphae",
    "minecraft:sulfur",
    "minecraft:sulfur_brick_double_slab",
    "minecraft:sulfur_brick_slab",
    "minecraft:sulfur_brick_stairs",
    "minecraft:sulfur_brick_wall",
    "minecraft:sulfur_bricks",
    "minecraft:sulfur_double_slab",
    "minecraft:sulfur_slab",
    "minecraft:sulfur_stairs",
    "minecraft:sulfur_wall",
    "minecraft:tuff",
    "minecraft:tuff_brick_double_slab",
    "minecraft:tuff_brick_slab",
    "minecraft:tuff_brick_stairs",
    "minecraft:tuff_brick_wall",
    "minecraft:tuff_bricks",
    "minecraft:tuff_double_slab",
    "minecraft:tuff_slab",
    "minecraft:tuff_stairs",
    "minecraft:tuff_wall",
    "minecraft:warped_double_slab",
    "minecraft:warped_fence",
    "minecraft:warped_fence_gate",
    "minecraft:warped_hyphae",
    "minecraft:warped_planks",
    "minecraft:warped_slab",
    "minecraft:warped_stairs",
    "minecraft:waxed_copper",
    "minecraft:waxed_copper_golem_statue",
    "minecraft:waxed_copper_grate",
    "minecraft:white_carpet",
    "minecraft:white_concrete",
    "minecraft:white_stained_glass",
    "minecraft:white_wool",
    "minecraft:wood",
    "minecraft:wooden_door",
    "minecraft:wooden_slab",
    "minecraft:wool",
    "minecraft:yellow_carpet",
    "minecraft:yellow_concrete",
    "minecraft:yellow_stained_glass",
    "minecraft:yellow_wool"
];
const COMPATIBLE_BLOCKS_PER_PAGE = 30;
const CONNECTION_DIRECTIONS = [
    ["north", { x: 0, y: 0, z: -1 }],
    ["east", { x: 1, y: 0, z: 0 }],
    ["south", { x: 0, y: 0, z: 1 }],
    ["west", { x: -1, y: 0, z: 0 }],
];
const BASE_IDS = {
    block: "kedu:camo_block",
    stairs: "kedu:camo_stairs",
    slab: "kedu:camo_slab",
    vertical_slab: "kedu:camo_vertical_slab",
    fence: "kedu:camo_fence",
    wall: "kedu:camo_wall",
    trapdoor: "kedu:camo_trapdoor",
    passable_block: "kedu:camo_passable_block",
};
export const MATERIALS = new Map([
    ["minecraft:acacia_door", {"block":{"bank":2,"index":0},"stairs":{"bank":2,"index":0},"slab":{"bank":2,"index":0},"vertical_slab":{"bank":2,"index":0},"fence":{"bank":2,"index":0},"wall":{"bank":2,"index":0},"trapdoor":{"bank":2,"index":0},"passable_block":{"bank":2,"index":0},"placeSound":"place.wood"}],
    ["minecraft:acacia_double_slab", {"block":{"bank":2,"index":1},"stairs":{"bank":2,"index":1},"slab":{"bank":2,"index":1},"vertical_slab":{"bank":2,"index":1},"fence":{"bank":2,"index":1},"wall":{"bank":2,"index":1},"trapdoor":{"bank":2,"index":1},"passable_block":{"bank":2,"index":1},"placeSound":"place.wood"}],
    ["minecraft:acacia_fence", {"block":{"bank":2,"index":1},"stairs":{"bank":2,"index":1},"slab":{"bank":2,"index":1},"vertical_slab":{"bank":2,"index":1},"fence":{"bank":2,"index":1},"wall":{"bank":2,"index":1},"trapdoor":{"bank":2,"index":1},"passable_block":{"bank":2,"index":1},"placeSound":"place.wood"}],
    ["minecraft:acacia_fence_gate", {"block":{"bank":2,"index":1},"stairs":{"bank":2,"index":1},"slab":{"bank":2,"index":1},"vertical_slab":{"bank":2,"index":1},"fence":{"bank":2,"index":1},"wall":{"bank":2,"index":1},"trapdoor":{"bank":2,"index":1},"passable_block":{"bank":2,"index":1},"placeSound":"place.wood"}],
    ["minecraft:acacia_planks", {"block":{"bank":2,"index":1},"stairs":{"bank":2,"index":1},"slab":{"bank":2,"index":1},"vertical_slab":{"bank":2,"index":1},"fence":{"bank":2,"index":1},"wall":{"bank":2,"index":1},"trapdoor":{"bank":2,"index":1},"passable_block":{"bank":2,"index":1},"placeSound":"place.wood"}],
    ["minecraft:acacia_slab", {"block":{"bank":2,"index":1},"stairs":{"bank":2,"index":1},"slab":{"bank":2,"index":1},"vertical_slab":{"bank":2,"index":1},"fence":{"bank":2,"index":1},"wall":{"bank":2,"index":1},"trapdoor":{"bank":2,"index":1},"passable_block":{"bank":2,"index":1},"placeSound":"place.wood"}],
    ["minecraft:acacia_stairs", {"block":{"bank":2,"index":1},"stairs":{"bank":2,"index":1},"slab":{"bank":2,"index":1},"vertical_slab":{"bank":2,"index":1},"fence":{"bank":2,"index":1},"wall":{"bank":2,"index":1},"trapdoor":{"bank":2,"index":1},"passable_block":{"bank":2,"index":1},"placeSound":"place.wood"}],
    ["minecraft:acacia_wood", {"block":{"bank":2,"index":5},"stairs":{"bank":2,"index":5},"slab":{"bank":2,"index":5},"vertical_slab":{"bank":2,"index":5},"fence":{"bank":2,"index":5},"wall":{"bank":2,"index":5},"trapdoor":{"bank":2,"index":5},"passable_block":{"bank":2,"index":5},"placeSound":"place.wood"}],
    ["minecraft:amethyst_block", {"block":{"bank":2,"index":8},"stairs":{"bank":2,"index":8},"slab":{"bank":2,"index":8},"vertical_slab":{"bank":2,"index":8},"fence":{"bank":2,"index":8},"wall":{"bank":2,"index":8},"trapdoor":{"bank":2,"index":8},"passable_block":{"bank":2,"index":8},"placeSound":"place.amethyst_block"}],
    ["minecraft:andesite", {"block":{"bank":2,"index":11},"stairs":{"bank":2,"index":11},"slab":{"bank":2,"index":11},"vertical_slab":{"bank":2,"index":11},"fence":{"bank":2,"index":11},"wall":{"bank":2,"index":11},"trapdoor":{"bank":2,"index":11},"passable_block":{"bank":2,"index":11},"placeSound":"place.stone"}],
    ["minecraft:andesite_double_slab", {"block":{"bank":2,"index":11},"stairs":{"bank":2,"index":11},"slab":{"bank":2,"index":11},"vertical_slab":{"bank":2,"index":11},"fence":{"bank":2,"index":11},"wall":{"bank":2,"index":11},"trapdoor":{"bank":2,"index":11},"passable_block":{"bank":2,"index":11},"placeSound":"place.stone"}],
    ["minecraft:andesite_slab", {"block":{"bank":2,"index":11},"stairs":{"bank":2,"index":11},"slab":{"bank":2,"index":11},"vertical_slab":{"bank":2,"index":11},"fence":{"bank":2,"index":11},"wall":{"bank":2,"index":11},"trapdoor":{"bank":2,"index":11},"passable_block":{"bank":2,"index":11},"placeSound":"place.stone"}],
    ["minecraft:andesite_stairs", {"block":{"bank":2,"index":11},"stairs":{"bank":2,"index":11},"slab":{"bank":2,"index":11},"vertical_slab":{"bank":2,"index":11},"fence":{"bank":2,"index":11},"wall":{"bank":2,"index":11},"trapdoor":{"bank":2,"index":11},"passable_block":{"bank":2,"index":11},"placeSound":"place.stone"}],
    ["minecraft:andesite_wall", {"block":{"bank":2,"index":11},"stairs":{"bank":2,"index":11},"slab":{"bank":2,"index":11},"vertical_slab":{"bank":2,"index":11},"fence":{"bank":2,"index":11},"wall":{"bank":2,"index":11},"trapdoor":{"bank":2,"index":11},"passable_block":{"bank":2,"index":11},"placeSound":"place.stone"}],
    ["minecraft:bamboo_double_slab", {"block":{"bank":3,"index":1},"stairs":{"bank":3,"index":1},"slab":{"bank":3,"index":1},"vertical_slab":{"bank":3,"index":1},"fence":{"bank":3,"index":1},"wall":{"bank":3,"index":1},"trapdoor":{"bank":3,"index":1},"passable_block":{"bank":3,"index":1},"placeSound":"place.bamboo_wood"}],
    ["minecraft:bamboo_planks", {"block":{"bank":3,"index":1},"stairs":{"bank":3,"index":1},"slab":{"bank":3,"index":1},"vertical_slab":{"bank":3,"index":1},"fence":{"bank":3,"index":1},"wall":{"bank":3,"index":1},"trapdoor":{"bank":3,"index":1},"passable_block":{"bank":3,"index":1},"placeSound":"place.bamboo_wood"}],
    ["minecraft:bamboo_slab", {"block":{"bank":3,"index":1},"stairs":{"bank":3,"index":1},"slab":{"bank":3,"index":1},"vertical_slab":{"bank":3,"index":1},"fence":{"bank":3,"index":1},"wall":{"bank":3,"index":1},"trapdoor":{"bank":3,"index":1},"passable_block":{"bank":3,"index":1},"placeSound":"place.bamboo_wood"}],
    ["minecraft:bamboo_stairs", {"block":{"bank":3,"index":1},"stairs":{"bank":3,"index":1},"slab":{"bank":3,"index":1},"vertical_slab":{"bank":3,"index":1},"fence":{"bank":3,"index":1},"wall":{"bank":3,"index":1},"trapdoor":{"bank":3,"index":1},"passable_block":{"bank":3,"index":1},"placeSound":"place.bamboo_wood"}],
    ["minecraft:basalt", {"block":{"bank":3,"index":9},"stairs":{"bank":3,"index":9},"slab":{"bank":3,"index":9},"vertical_slab":{"bank":3,"index":9},"fence":{"bank":3,"index":9},"wall":{"bank":3,"index":9},"trapdoor":{"bank":3,"index":9},"passable_block":{"bank":3,"index":9},"placeSound":"place.basalt"}],
    ["minecraft:bed", {"block":{"bank":3,"index":11},"stairs":{"bank":3,"index":11},"slab":{"bank":3,"index":11},"vertical_slab":{"bank":3,"index":11},"fence":{"bank":3,"index":11},"wall":{"bank":3,"index":11},"trapdoor":{"bank":3,"index":11},"passable_block":{"bank":3,"index":11},"placeSound":"place.wood"}],
    ["minecraft:birch_door", {"block":{"bank":2,"index":0},"stairs":{"bank":2,"index":0},"slab":{"bank":2,"index":0},"vertical_slab":{"bank":2,"index":0},"fence":{"bank":2,"index":0},"wall":{"bank":2,"index":0},"trapdoor":{"bank":2,"index":0},"passable_block":{"bank":2,"index":0},"placeSound":"place.wood"}],
    ["minecraft:birch_double_slab", {"block":{"bank":4,"index":1},"stairs":{"bank":4,"index":1},"slab":{"bank":4,"index":1},"vertical_slab":{"bank":4,"index":1},"fence":{"bank":4,"index":1},"wall":{"bank":4,"index":1},"trapdoor":{"bank":4,"index":1},"passable_block":{"bank":4,"index":1},"placeSound":"place.wood"}],
    ["minecraft:birch_fence", {"block":{"bank":4,"index":1},"stairs":{"bank":4,"index":1},"slab":{"bank":4,"index":1},"vertical_slab":{"bank":4,"index":1},"fence":{"bank":4,"index":1},"wall":{"bank":4,"index":1},"trapdoor":{"bank":4,"index":1},"passable_block":{"bank":4,"index":1},"placeSound":"place.wood"}],
    ["minecraft:birch_fence_gate", {"block":{"bank":4,"index":1},"stairs":{"bank":4,"index":1},"slab":{"bank":4,"index":1},"vertical_slab":{"bank":4,"index":1},"fence":{"bank":4,"index":1},"wall":{"bank":4,"index":1},"trapdoor":{"bank":4,"index":1},"passable_block":{"bank":4,"index":1},"placeSound":"place.wood"}],
    ["minecraft:birch_log", {"block":{"bank":4,"index":2},"stairs":{"bank":4,"index":2},"slab":{"bank":4,"index":2},"vertical_slab":{"bank":4,"index":2},"fence":{"bank":4,"index":2},"wall":{"bank":4,"index":2},"trapdoor":{"bank":4,"index":2},"passable_block":{"bank":4,"index":2},"placeSound":"place.wood"}],
    ["minecraft:birch_planks", {"block":{"bank":4,"index":1},"stairs":{"bank":4,"index":1},"slab":{"bank":4,"index":1},"vertical_slab":{"bank":4,"index":1},"fence":{"bank":4,"index":1},"wall":{"bank":4,"index":1},"trapdoor":{"bank":4,"index":1},"passable_block":{"bank":4,"index":1},"placeSound":"place.wood"}],
    ["minecraft:birch_slab", {"block":{"bank":4,"index":1},"stairs":{"bank":4,"index":1},"slab":{"bank":4,"index":1},"vertical_slab":{"bank":4,"index":1},"fence":{"bank":4,"index":1},"wall":{"bank":4,"index":1},"trapdoor":{"bank":4,"index":1},"passable_block":{"bank":4,"index":1},"placeSound":"place.wood"}],
    ["minecraft:birch_stairs", {"block":{"bank":4,"index":1},"stairs":{"bank":4,"index":1},"slab":{"bank":4,"index":1},"vertical_slab":{"bank":4,"index":1},"fence":{"bank":4,"index":1},"wall":{"bank":4,"index":1},"trapdoor":{"bank":4,"index":1},"passable_block":{"bank":4,"index":1},"placeSound":"place.wood"}],
    ["minecraft:birch_wood", {"block":{"bank":4,"index":5},"stairs":{"bank":4,"index":5},"slab":{"bank":4,"index":5},"vertical_slab":{"bank":4,"index":5},"fence":{"bank":4,"index":5},"wall":{"bank":4,"index":5},"trapdoor":{"bank":4,"index":5},"passable_block":{"bank":4,"index":5},"placeSound":"place.wood"}],
    ["minecraft:black_carpet", {"block":{"bank":4,"index":8},"stairs":{"bank":4,"index":8},"slab":{"bank":4,"index":8},"vertical_slab":{"bank":4,"index":8},"fence":{"bank":4,"index":8},"wall":{"bank":4,"index":8},"trapdoor":{"bank":4,"index":8},"passable_block":{"bank":4,"index":8},"placeSound":"place.cloth"}],
    ["minecraft:black_concrete", {"block":{"bank":4,"index":9},"stairs":{"bank":4,"index":9},"slab":{"bank":4,"index":9},"vertical_slab":{"bank":4,"index":9},"fence":{"bank":4,"index":9},"wall":{"bank":4,"index":9},"trapdoor":{"bank":4,"index":9},"passable_block":{"bank":4,"index":9},"placeSound":"place.stone"}],
    ["minecraft:black_stained_glass", {"block":{"bank":39,"index":0},"stairs":{"bank":39,"index":0},"slab":{"bank":39,"index":0},"vertical_slab":{"bank":39,"index":0},"fence":{"bank":39,"index":0},"wall":{"bank":39,"index":0},"trapdoor":{"bank":39,"index":0},"passable_block":{"bank":39,"index":0},"placeSound":"place.stone"}],
    ["minecraft:black_wool", {"block":{"bank":4,"index":8},"stairs":{"bank":4,"index":8},"slab":{"bank":4,"index":8},"vertical_slab":{"bank":4,"index":8},"fence":{"bank":4,"index":8},"wall":{"bank":4,"index":8},"trapdoor":{"bank":4,"index":8},"passable_block":{"bank":4,"index":8},"placeSound":"place.cloth"}],
    ["minecraft:blackstone", {"block":{"bank":4,"index":14},"stairs":{"bank":4,"index":14},"slab":{"bank":4,"index":14},"vertical_slab":{"bank":4,"index":14},"fence":{"bank":4,"index":14},"wall":{"bank":4,"index":14},"trapdoor":{"bank":4,"index":14},"passable_block":{"bank":4,"index":14},"placeSound":"place.stone"}],
    ["minecraft:blue_carpet", {"block":{"bank":5,"index":2},"stairs":{"bank":5,"index":2},"slab":{"bank":5,"index":2},"vertical_slab":{"bank":5,"index":2},"fence":{"bank":5,"index":2},"wall":{"bank":5,"index":2},"trapdoor":{"bank":5,"index":2},"passable_block":{"bank":5,"index":2},"placeSound":"place.cloth"}],
    ["minecraft:blue_concrete", {"block":{"bank":5,"index":3},"stairs":{"bank":5,"index":3},"slab":{"bank":5,"index":3},"vertical_slab":{"bank":5,"index":3},"fence":{"bank":5,"index":3},"wall":{"bank":5,"index":3},"trapdoor":{"bank":5,"index":3},"passable_block":{"bank":5,"index":3},"placeSound":"place.stone"}],
    ["minecraft:blue_stained_glass", {"block":{"bank":39,"index":2},"stairs":{"bank":39,"index":2},"slab":{"bank":39,"index":2},"vertical_slab":{"bank":39,"index":2},"fence":{"bank":39,"index":2},"wall":{"bank":39,"index":2},"trapdoor":{"bank":39,"index":2},"passable_block":{"bank":39,"index":2},"placeSound":"place.stone"}],
    ["minecraft:blue_wool", {"block":{"bank":5,"index":2},"stairs":{"bank":5,"index":2},"slab":{"bank":5,"index":2},"vertical_slab":{"bank":5,"index":2},"fence":{"bank":5,"index":2},"wall":{"bank":5,"index":2},"trapdoor":{"bank":5,"index":2},"passable_block":{"bank":5,"index":2},"placeSound":"place.cloth"}],
    ["minecraft:brick_block", {"block":{"bank":5,"index":15},"stairs":{"bank":5,"index":15},"slab":{"bank":5,"index":15},"vertical_slab":{"bank":5,"index":15},"fence":{"bank":5,"index":15},"wall":{"bank":5,"index":15},"trapdoor":{"bank":5,"index":15},"passable_block":{"bank":5,"index":15},"placeSound":"place.stone"}],
    ["minecraft:brick_double_slab", {"block":{"bank":5,"index":15},"stairs":{"bank":5,"index":15},"slab":{"bank":5,"index":15},"vertical_slab":{"bank":5,"index":15},"fence":{"bank":5,"index":15},"wall":{"bank":5,"index":15},"trapdoor":{"bank":5,"index":15},"passable_block":{"bank":5,"index":15},"placeSound":"place.stone"}],
    ["minecraft:brick_slab", {"block":{"bank":5,"index":15},"stairs":{"bank":5,"index":15},"slab":{"bank":5,"index":15},"vertical_slab":{"bank":5,"index":15},"fence":{"bank":5,"index":15},"wall":{"bank":5,"index":15},"trapdoor":{"bank":5,"index":15},"passable_block":{"bank":5,"index":15},"placeSound":"place.stone"}],
    ["minecraft:brick_stairs", {"block":{"bank":5,"index":15},"stairs":{"bank":5,"index":15},"slab":{"bank":5,"index":15},"vertical_slab":{"bank":5,"index":15},"fence":{"bank":5,"index":15},"wall":{"bank":5,"index":15},"trapdoor":{"bank":5,"index":15},"passable_block":{"bank":5,"index":15},"placeSound":"place.stone"}],
    ["minecraft:brick_wall", {"block":{"bank":5,"index":15},"stairs":{"bank":5,"index":15},"slab":{"bank":5,"index":15},"vertical_slab":{"bank":5,"index":15},"fence":{"bank":5,"index":15},"wall":{"bank":5,"index":15},"trapdoor":{"bank":5,"index":15},"passable_block":{"bank":5,"index":15},"placeSound":"place.stone"}],
    ["minecraft:brown_carpet", {"block":{"bank":6,"index":1},"stairs":{"bank":6,"index":1},"slab":{"bank":6,"index":1},"vertical_slab":{"bank":6,"index":1},"fence":{"bank":6,"index":1},"wall":{"bank":6,"index":1},"trapdoor":{"bank":6,"index":1},"passable_block":{"bank":6,"index":1},"placeSound":"place.cloth"}],
    ["minecraft:brown_concrete", {"block":{"bank":6,"index":2},"stairs":{"bank":6,"index":2},"slab":{"bank":6,"index":2},"vertical_slab":{"bank":6,"index":2},"fence":{"bank":6,"index":2},"wall":{"bank":6,"index":2},"trapdoor":{"bank":6,"index":2},"passable_block":{"bank":6,"index":2},"placeSound":"place.stone"}],
    ["minecraft:brown_stained_glass", {"block":{"bank":39,"index":4},"stairs":{"bank":39,"index":4},"slab":{"bank":39,"index":4},"vertical_slab":{"bank":39,"index":4},"fence":{"bank":39,"index":4},"wall":{"bank":39,"index":4},"trapdoor":{"bank":39,"index":4},"passable_block":{"bank":39,"index":4},"placeSound":"place.stone"}],
    ["minecraft:brown_wool", {"block":{"bank":6,"index":1},"stairs":{"bank":6,"index":1},"slab":{"bank":6,"index":1},"vertical_slab":{"bank":6,"index":1},"fence":{"bank":6,"index":1},"wall":{"bank":6,"index":1},"trapdoor":{"bank":6,"index":1},"passable_block":{"bank":6,"index":1},"placeSound":"place.cloth"}],
    ["minecraft:calcite", {"block":{"bank":6,"index":14},"stairs":{"bank":6,"index":14},"slab":{"bank":6,"index":14},"vertical_slab":{"bank":6,"index":14},"fence":{"bank":6,"index":14},"wall":{"bank":6,"index":14},"trapdoor":{"bank":6,"index":14},"passable_block":{"bank":6,"index":14},"placeSound":"place.calcite"}],
    ["minecraft:carpet", {"block":{"bank":7,"index":3},"stairs":{"bank":7,"index":3},"slab":{"bank":7,"index":3},"vertical_slab":{"bank":7,"index":3},"fence":{"bank":7,"index":3},"wall":{"bank":7,"index":3},"trapdoor":{"bank":7,"index":3},"passable_block":{"bank":7,"index":3},"placeSound":"place.cloth"}],
    ["minecraft:cherry_double_slab", {"block":{"bank":7,"index":10},"stairs":{"bank":7,"index":10},"slab":{"bank":7,"index":10},"vertical_slab":{"bank":7,"index":10},"fence":{"bank":7,"index":10},"wall":{"bank":7,"index":10},"trapdoor":{"bank":7,"index":10},"passable_block":{"bank":7,"index":10},"placeSound":"place.cherry_wood"}],
    ["minecraft:cherry_fence", {"block":{"bank":7,"index":10},"stairs":{"bank":7,"index":10},"slab":{"bank":7,"index":10},"vertical_slab":{"bank":7,"index":10},"fence":{"bank":7,"index":10},"wall":{"bank":7,"index":10},"trapdoor":{"bank":7,"index":10},"passable_block":{"bank":7,"index":10},"placeSound":"place.cherry_wood"}],
    ["minecraft:cherry_fence_gate", {"block":{"bank":7,"index":10},"stairs":{"bank":7,"index":10},"slab":{"bank":7,"index":10},"vertical_slab":{"bank":7,"index":10},"fence":{"bank":7,"index":10},"wall":{"bank":7,"index":10},"trapdoor":{"bank":7,"index":10},"passable_block":{"bank":7,"index":10},"placeSound":"place.cherry_wood"}],
    ["minecraft:cherry_planks", {"block":{"bank":7,"index":10},"stairs":{"bank":7,"index":10},"slab":{"bank":7,"index":10},"vertical_slab":{"bank":7,"index":10},"fence":{"bank":7,"index":10},"wall":{"bank":7,"index":10},"trapdoor":{"bank":7,"index":10},"passable_block":{"bank":7,"index":10},"placeSound":"place.cherry_wood"}],
    ["minecraft:cherry_slab", {"block":{"bank":7,"index":10},"stairs":{"bank":7,"index":10},"slab":{"bank":7,"index":10},"vertical_slab":{"bank":7,"index":10},"fence":{"bank":7,"index":10},"wall":{"bank":7,"index":10},"trapdoor":{"bank":7,"index":10},"passable_block":{"bank":7,"index":10},"placeSound":"place.cherry_wood"}],
    ["minecraft:cherry_stairs", {"block":{"bank":7,"index":10},"stairs":{"bank":7,"index":10},"slab":{"bank":7,"index":10},"vertical_slab":{"bank":7,"index":10},"fence":{"bank":7,"index":10},"wall":{"bank":7,"index":10},"trapdoor":{"bank":7,"index":10},"passable_block":{"bank":7,"index":10},"placeSound":"place.cherry_wood"}],
    ["minecraft:cherry_wood", {"block":{"bank":7,"index":14},"stairs":{"bank":7,"index":14},"slab":{"bank":7,"index":14},"vertical_slab":{"bank":7,"index":14},"fence":{"bank":7,"index":14},"wall":{"bank":7,"index":14},"trapdoor":{"bank":7,"index":14},"passable_block":{"bank":7,"index":14},"placeSound":"place.cherry_wood"}],
    ["minecraft:cinnabar", {"block":{"bank":9,"index":0},"stairs":{"bank":9,"index":0},"slab":{"bank":9,"index":0},"vertical_slab":{"bank":9,"index":0},"fence":{"bank":9,"index":0},"wall":{"bank":9,"index":0},"trapdoor":{"bank":9,"index":0},"passable_block":{"bank":9,"index":0},"placeSound":"block.cinnabar.place"}],
    ["minecraft:cinnabar_brick_double_slab", {"block":{"bank":9,"index":1},"stairs":{"bank":9,"index":1},"slab":{"bank":9,"index":1},"vertical_slab":{"bank":9,"index":1},"fence":{"bank":9,"index":1},"wall":{"bank":9,"index":1},"trapdoor":{"bank":9,"index":1},"passable_block":{"bank":9,"index":1},"placeSound":"block.cinnabar.place"}],
    ["minecraft:cinnabar_brick_slab", {"block":{"bank":9,"index":1},"stairs":{"bank":9,"index":1},"slab":{"bank":9,"index":1},"vertical_slab":{"bank":9,"index":1},"fence":{"bank":9,"index":1},"wall":{"bank":9,"index":1},"trapdoor":{"bank":9,"index":1},"passable_block":{"bank":9,"index":1},"placeSound":"block.cinnabar.place"}],
    ["minecraft:cinnabar_brick_stairs", {"block":{"bank":9,"index":1},"stairs":{"bank":9,"index":1},"slab":{"bank":9,"index":1},"vertical_slab":{"bank":9,"index":1},"fence":{"bank":9,"index":1},"wall":{"bank":9,"index":1},"trapdoor":{"bank":9,"index":1},"passable_block":{"bank":9,"index":1},"placeSound":"block.cinnabar.place"}],
    ["minecraft:cinnabar_brick_wall", {"block":{"bank":9,"index":1},"stairs":{"bank":9,"index":1},"slab":{"bank":9,"index":1},"vertical_slab":{"bank":9,"index":1},"fence":{"bank":9,"index":1},"wall":{"bank":9,"index":1},"trapdoor":{"bank":9,"index":1},"passable_block":{"bank":9,"index":1},"placeSound":"block.cinnabar.place"}],
    ["minecraft:cinnabar_bricks", {"block":{"bank":9,"index":1},"stairs":{"bank":9,"index":1},"slab":{"bank":9,"index":1},"vertical_slab":{"bank":9,"index":1},"fence":{"bank":9,"index":1},"wall":{"bank":9,"index":1},"trapdoor":{"bank":9,"index":1},"passable_block":{"bank":9,"index":1},"placeSound":"block.cinnabar.place"}],
    ["minecraft:cinnabar_double_slab", {"block":{"bank":9,"index":0},"stairs":{"bank":9,"index":0},"slab":{"bank":9,"index":0},"vertical_slab":{"bank":9,"index":0},"fence":{"bank":9,"index":0},"wall":{"bank":9,"index":0},"trapdoor":{"bank":9,"index":0},"passable_block":{"bank":9,"index":0},"placeSound":"block.cinnabar.place"}],
    ["minecraft:cinnabar_slab", {"block":{"bank":9,"index":0},"stairs":{"bank":9,"index":0},"slab":{"bank":9,"index":0},"vertical_slab":{"bank":9,"index":0},"fence":{"bank":9,"index":0},"wall":{"bank":9,"index":0},"trapdoor":{"bank":9,"index":0},"passable_block":{"bank":9,"index":0},"placeSound":"block.cinnabar.place"}],
    ["minecraft:cinnabar_stairs", {"block":{"bank":9,"index":0},"stairs":{"bank":9,"index":0},"slab":{"bank":9,"index":0},"vertical_slab":{"bank":9,"index":0},"fence":{"bank":9,"index":0},"wall":{"bank":9,"index":0},"trapdoor":{"bank":9,"index":0},"passable_block":{"bank":9,"index":0},"placeSound":"block.cinnabar.place"}],
    ["minecraft:cinnabar_wall", {"block":{"bank":9,"index":0},"stairs":{"bank":9,"index":0},"slab":{"bank":9,"index":0},"vertical_slab":{"bank":9,"index":0},"fence":{"bank":9,"index":0},"wall":{"bank":9,"index":0},"trapdoor":{"bank":9,"index":0},"passable_block":{"bank":9,"index":0},"placeSound":"block.cinnabar.place"}],
    ["minecraft:coal_block", {"block":{"bank":9,"index":4},"stairs":{"bank":9,"index":4},"slab":{"bank":9,"index":4},"vertical_slab":{"bank":9,"index":4},"fence":{"bank":9,"index":4},"wall":{"bank":9,"index":4},"trapdoor":{"bank":9,"index":4},"passable_block":{"bank":9,"index":4},"placeSound":"place.stone"}],
    ["minecraft:cobbled_deepslate", {"block":{"bank":9,"index":7},"stairs":{"bank":9,"index":7},"slab":{"bank":9,"index":7},"vertical_slab":{"bank":9,"index":7},"fence":{"bank":9,"index":7},"wall":{"bank":9,"index":7},"trapdoor":{"bank":9,"index":7},"passable_block":{"bank":9,"index":7},"placeSound":"place.deepslate"}],
    ["minecraft:cobbled_deepslate_double_slab", {"block":{"bank":9,"index":7},"stairs":{"bank":9,"index":7},"slab":{"bank":9,"index":7},"vertical_slab":{"bank":9,"index":7},"fence":{"bank":9,"index":7},"wall":{"bank":9,"index":7},"trapdoor":{"bank":9,"index":7},"passable_block":{"bank":9,"index":7},"placeSound":"place.deepslate"}],
    ["minecraft:cobbled_deepslate_slab", {"block":{"bank":9,"index":7},"stairs":{"bank":9,"index":7},"slab":{"bank":9,"index":7},"vertical_slab":{"bank":9,"index":7},"fence":{"bank":9,"index":7},"wall":{"bank":9,"index":7},"trapdoor":{"bank":9,"index":7},"passable_block":{"bank":9,"index":7},"placeSound":"place.deepslate"}],
    ["minecraft:cobbled_deepslate_stairs", {"block":{"bank":9,"index":7},"stairs":{"bank":9,"index":7},"slab":{"bank":9,"index":7},"vertical_slab":{"bank":9,"index":7},"fence":{"bank":9,"index":7},"wall":{"bank":9,"index":7},"trapdoor":{"bank":9,"index":7},"passable_block":{"bank":9,"index":7},"placeSound":"place.deepslate"}],
    ["minecraft:cobbled_deepslate_wall", {"block":{"bank":9,"index":7},"stairs":{"bank":9,"index":7},"slab":{"bank":9,"index":7},"vertical_slab":{"bank":9,"index":7},"fence":{"bank":9,"index":7},"wall":{"bank":9,"index":7},"trapdoor":{"bank":9,"index":7},"passable_block":{"bank":9,"index":7},"placeSound":"place.deepslate"}],
    ["minecraft:cobblestone", {"block":{"bank":9,"index":8},"stairs":{"bank":9,"index":8},"slab":{"bank":9,"index":8},"vertical_slab":{"bank":9,"index":8},"fence":{"bank":9,"index":8},"wall":{"bank":9,"index":8},"trapdoor":{"bank":9,"index":8},"passable_block":{"bank":9,"index":8},"placeSound":"place.stone"}],
    ["minecraft:cobblestone_double_slab", {"block":{"bank":9,"index":8},"stairs":{"bank":9,"index":8},"slab":{"bank":9,"index":8},"vertical_slab":{"bank":9,"index":8},"fence":{"bank":9,"index":8},"wall":{"bank":9,"index":8},"trapdoor":{"bank":9,"index":8},"passable_block":{"bank":9,"index":8},"placeSound":"place.stone"}],
    ["minecraft:cobblestone_slab", {"block":{"bank":9,"index":8},"stairs":{"bank":9,"index":8},"slab":{"bank":9,"index":8},"vertical_slab":{"bank":9,"index":8},"fence":{"bank":9,"index":8},"wall":{"bank":9,"index":8},"trapdoor":{"bank":9,"index":8},"passable_block":{"bank":9,"index":8},"placeSound":"place.stone"}],
    ["minecraft:cobblestone_wall", {"block":{"bank":9,"index":8},"stairs":{"bank":9,"index":8},"slab":{"bank":9,"index":8},"vertical_slab":{"bank":9,"index":8},"fence":{"bank":9,"index":8},"wall":{"bank":9,"index":8},"trapdoor":{"bank":9,"index":8},"passable_block":{"bank":9,"index":8},"placeSound":"place.stone"}],
    ["minecraft:concrete", {"block":{"bank":9,"index":12},"stairs":{"bank":9,"index":12},"slab":{"bank":9,"index":12},"vertical_slab":{"bank":9,"index":12},"fence":{"bank":9,"index":12},"wall":{"bank":9,"index":12},"trapdoor":{"bank":9,"index":12},"passable_block":{"bank":9,"index":12},"placeSound":"place.stone"}],
    ["minecraft:copper_block", {"block":{"bank":10,"index":0},"stairs":{"bank":10,"index":0},"slab":{"bank":10,"index":0},"vertical_slab":{"bank":10,"index":0},"fence":{"bank":10,"index":0},"wall":{"bank":10,"index":0},"trapdoor":{"bank":10,"index":0},"passable_block":{"bank":10,"index":0},"placeSound":"place.copper"}],
    ["minecraft:copper_golem_statue", {"block":{"bank":10,"index":0},"stairs":{"bank":10,"index":0},"slab":{"bank":10,"index":0},"vertical_slab":{"bank":10,"index":0},"fence":{"bank":10,"index":0},"wall":{"bank":10,"index":0},"trapdoor":{"bank":10,"index":0},"passable_block":{"bank":10,"index":0},"placeSound":"place.stone"}],
    ["minecraft:copper_grate", {"block":{"bank":10,"index":5},"stairs":{"bank":10,"index":5},"slab":{"bank":10,"index":5},"vertical_slab":{"bank":10,"index":5},"fence":{"bank":10,"index":5},"wall":{"bank":10,"index":5},"trapdoor":{"bank":10,"index":5},"passable_block":{"bank":10,"index":5},"placeSound":"place.copper_grate"}],
    ["minecraft:crimson_double_slab", {"block":{"bank":11,"index":5},"stairs":{"bank":11,"index":5},"slab":{"bank":11,"index":5},"vertical_slab":{"bank":11,"index":5},"fence":{"bank":11,"index":5},"wall":{"bank":11,"index":5},"trapdoor":{"bank":11,"index":5},"passable_block":{"bank":11,"index":5},"placeSound":"place.nether_wood"}],
    ["minecraft:crimson_fence", {"block":{"bank":11,"index":5},"stairs":{"bank":11,"index":5},"slab":{"bank":11,"index":5},"vertical_slab":{"bank":11,"index":5},"fence":{"bank":11,"index":5},"wall":{"bank":11,"index":5},"trapdoor":{"bank":11,"index":5},"passable_block":{"bank":11,"index":5},"placeSound":"place.nether_wood"}],
    ["minecraft:crimson_fence_gate", {"block":{"bank":11,"index":5},"stairs":{"bank":11,"index":5},"slab":{"bank":11,"index":5},"vertical_slab":{"bank":11,"index":5},"fence":{"bank":11,"index":5},"wall":{"bank":11,"index":5},"trapdoor":{"bank":11,"index":5},"passable_block":{"bank":11,"index":5},"placeSound":"place.nether_wood"}],
    ["minecraft:crimson_hyphae", {"block":{"bank":11,"index":7},"stairs":{"bank":11,"index":7},"slab":{"bank":11,"index":7},"vertical_slab":{"bank":11,"index":7},"fence":{"bank":11,"index":7},"wall":{"bank":11,"index":7},"trapdoor":{"bank":11,"index":7},"passable_block":{"bank":11,"index":7},"placeSound":"place.stem"}],
    ["minecraft:crimson_planks", {"block":{"bank":11,"index":5},"stairs":{"bank":11,"index":5},"slab":{"bank":11,"index":5},"vertical_slab":{"bank":11,"index":5},"fence":{"bank":11,"index":5},"wall":{"bank":11,"index":5},"trapdoor":{"bank":11,"index":5},"passable_block":{"bank":11,"index":5},"placeSound":"place.nether_wood"}],
    ["minecraft:crimson_slab", {"block":{"bank":11,"index":5},"stairs":{"bank":11,"index":5},"slab":{"bank":11,"index":5},"vertical_slab":{"bank":11,"index":5},"fence":{"bank":11,"index":5},"wall":{"bank":11,"index":5},"trapdoor":{"bank":11,"index":5},"passable_block":{"bank":11,"index":5},"placeSound":"place.nether_wood"}],
    ["minecraft:crimson_stairs", {"block":{"bank":11,"index":5},"stairs":{"bank":11,"index":5},"slab":{"bank":11,"index":5},"vertical_slab":{"bank":11,"index":5},"fence":{"bank":11,"index":5},"wall":{"bank":11,"index":5},"trapdoor":{"bank":11,"index":5},"passable_block":{"bank":11,"index":5},"placeSound":"place.nether_wood"}],
    ["minecraft:cyan_carpet", {"block":{"bank":12,"index":1},"stairs":{"bank":12,"index":1},"slab":{"bank":12,"index":1},"vertical_slab":{"bank":12,"index":1},"fence":{"bank":12,"index":1},"wall":{"bank":12,"index":1},"trapdoor":{"bank":12,"index":1},"passable_block":{"bank":12,"index":1},"placeSound":"place.cloth"}],
    ["minecraft:cyan_concrete", {"block":{"bank":12,"index":2},"stairs":{"bank":12,"index":2},"slab":{"bank":12,"index":2},"vertical_slab":{"bank":12,"index":2},"fence":{"bank":12,"index":2},"wall":{"bank":12,"index":2},"trapdoor":{"bank":12,"index":2},"passable_block":{"bank":12,"index":2},"placeSound":"place.stone"}],
    ["minecraft:cyan_stained_glass", {"block":{"bank":39,"index":6},"stairs":{"bank":39,"index":6},"slab":{"bank":39,"index":6},"vertical_slab":{"bank":39,"index":6},"fence":{"bank":39,"index":6},"wall":{"bank":39,"index":6},"trapdoor":{"bank":39,"index":6},"passable_block":{"bank":39,"index":6},"placeSound":"place.stone"}],
    ["minecraft:cyan_wool", {"block":{"bank":12,"index":1},"stairs":{"bank":12,"index":1},"slab":{"bank":12,"index":1},"vertical_slab":{"bank":12,"index":1},"fence":{"bank":12,"index":1},"wall":{"bank":12,"index":1},"trapdoor":{"bank":12,"index":1},"passable_block":{"bank":12,"index":1},"placeSound":"place.cloth"}],
    ["minecraft:dark_oak_door", {"block":{"bank":2,"index":0},"stairs":{"bank":2,"index":0},"slab":{"bank":2,"index":0},"vertical_slab":{"bank":2,"index":0},"fence":{"bank":2,"index":0},"wall":{"bank":2,"index":0},"trapdoor":{"bank":2,"index":0},"passable_block":{"bank":2,"index":0},"placeSound":"place.wood"}],
    ["minecraft:dark_oak_double_slab", {"block":{"bank":12,"index":8},"stairs":{"bank":12,"index":8},"slab":{"bank":12,"index":8},"vertical_slab":{"bank":12,"index":8},"fence":{"bank":12,"index":8},"wall":{"bank":12,"index":8},"trapdoor":{"bank":12,"index":8},"passable_block":{"bank":12,"index":8},"placeSound":"place.wood"}],
    ["minecraft:dark_oak_fence", {"block":{"bank":12,"index":8},"stairs":{"bank":12,"index":8},"slab":{"bank":12,"index":8},"vertical_slab":{"bank":12,"index":8},"fence":{"bank":12,"index":8},"wall":{"bank":12,"index":8},"trapdoor":{"bank":12,"index":8},"passable_block":{"bank":12,"index":8},"placeSound":"place.wood"}],
    ["minecraft:dark_oak_fence_gate", {"block":{"bank":12,"index":8},"stairs":{"bank":12,"index":8},"slab":{"bank":12,"index":8},"vertical_slab":{"bank":12,"index":8},"fence":{"bank":12,"index":8},"wall":{"bank":12,"index":8},"trapdoor":{"bank":12,"index":8},"passable_block":{"bank":12,"index":8},"placeSound":"place.wood"}],
    ["minecraft:dark_oak_planks", {"block":{"bank":12,"index":8},"stairs":{"bank":12,"index":8},"slab":{"bank":12,"index":8},"vertical_slab":{"bank":12,"index":8},"fence":{"bank":12,"index":8},"wall":{"bank":12,"index":8},"trapdoor":{"bank":12,"index":8},"passable_block":{"bank":12,"index":8},"placeSound":"place.wood"}],
    ["minecraft:dark_oak_slab", {"block":{"bank":12,"index":8},"stairs":{"bank":12,"index":8},"slab":{"bank":12,"index":8},"vertical_slab":{"bank":12,"index":8},"fence":{"bank":12,"index":8},"wall":{"bank":12,"index":8},"trapdoor":{"bank":12,"index":8},"passable_block":{"bank":12,"index":8},"placeSound":"place.wood"}],
    ["minecraft:dark_oak_stairs", {"block":{"bank":12,"index":8},"stairs":{"bank":12,"index":8},"slab":{"bank":12,"index":8},"vertical_slab":{"bank":12,"index":8},"fence":{"bank":12,"index":8},"wall":{"bank":12,"index":8},"trapdoor":{"bank":12,"index":8},"passable_block":{"bank":12,"index":8},"placeSound":"place.wood"}],
    ["minecraft:dark_oak_wood", {"block":{"bank":12,"index":12},"stairs":{"bank":12,"index":12},"slab":{"bank":12,"index":12},"vertical_slab":{"bank":12,"index":12},"fence":{"bank":12,"index":12},"wall":{"bank":12,"index":12},"trapdoor":{"bank":12,"index":12},"passable_block":{"bank":12,"index":12},"placeSound":"place.wood"}],
    ["minecraft:dark_prismarine", {"block":{"bank":12,"index":13},"stairs":{"bank":12,"index":13},"slab":{"bank":12,"index":13},"vertical_slab":{"bank":12,"index":13},"fence":{"bank":12,"index":13},"wall":{"bank":12,"index":13},"trapdoor":{"bank":12,"index":13},"passable_block":{"bank":12,"index":13},"placeSound":"place.stone"}],
    ["minecraft:dark_prismarine_double_slab", {"block":{"bank":12,"index":13},"stairs":{"bank":12,"index":13},"slab":{"bank":12,"index":13},"vertical_slab":{"bank":12,"index":13},"fence":{"bank":12,"index":13},"wall":{"bank":12,"index":13},"trapdoor":{"bank":12,"index":13},"passable_block":{"bank":12,"index":13},"placeSound":"place.stone"}],
    ["minecraft:dark_prismarine_slab", {"block":{"bank":12,"index":13},"stairs":{"bank":12,"index":13},"slab":{"bank":12,"index":13},"vertical_slab":{"bank":12,"index":13},"fence":{"bank":12,"index":13},"wall":{"bank":12,"index":13},"trapdoor":{"bank":12,"index":13},"passable_block":{"bank":12,"index":13},"placeSound":"place.stone"}],
    ["minecraft:dark_prismarine_stairs", {"block":{"bank":12,"index":13},"stairs":{"bank":12,"index":13},"slab":{"bank":12,"index":13},"vertical_slab":{"bank":12,"index":13},"fence":{"bank":12,"index":13},"wall":{"bank":12,"index":13},"trapdoor":{"bank":12,"index":13},"passable_block":{"bank":12,"index":13},"placeSound":"place.stone"}],
    ["minecraft:deepslate", {"block":{"bank":13,"index":10},"stairs":{"bank":13,"index":10},"slab":{"bank":13,"index":10},"vertical_slab":{"bank":13,"index":10},"fence":{"bank":13,"index":10},"wall":{"bank":13,"index":10},"trapdoor":{"bank":13,"index":10},"passable_block":{"bank":13,"index":10},"placeSound":"place.deepslate"}],
    ["minecraft:deepslate_brick_double_slab", {"block":{"bank":13,"index":11},"stairs":{"bank":13,"index":11},"slab":{"bank":13,"index":11},"vertical_slab":{"bank":13,"index":11},"fence":{"bank":13,"index":11},"wall":{"bank":13,"index":11},"trapdoor":{"bank":13,"index":11},"passable_block":{"bank":13,"index":11},"placeSound":"place.deepslate_bricks"}],
    ["minecraft:deepslate_brick_slab", {"block":{"bank":13,"index":11},"stairs":{"bank":13,"index":11},"slab":{"bank":13,"index":11},"vertical_slab":{"bank":13,"index":11},"fence":{"bank":13,"index":11},"wall":{"bank":13,"index":11},"trapdoor":{"bank":13,"index":11},"passable_block":{"bank":13,"index":11},"placeSound":"place.deepslate_bricks"}],
    ["minecraft:deepslate_brick_stairs", {"block":{"bank":13,"index":11},"stairs":{"bank":13,"index":11},"slab":{"bank":13,"index":11},"vertical_slab":{"bank":13,"index":11},"fence":{"bank":13,"index":11},"wall":{"bank":13,"index":11},"trapdoor":{"bank":13,"index":11},"passable_block":{"bank":13,"index":11},"placeSound":"place.deepslate_bricks"}],
    ["minecraft:deepslate_brick_wall", {"block":{"bank":13,"index":11},"stairs":{"bank":13,"index":11},"slab":{"bank":13,"index":11},"vertical_slab":{"bank":13,"index":11},"fence":{"bank":13,"index":11},"wall":{"bank":13,"index":11},"trapdoor":{"bank":13,"index":11},"passable_block":{"bank":13,"index":11},"placeSound":"place.deepslate_bricks"}],
    ["minecraft:deepslate_bricks", {"block":{"bank":13,"index":11},"stairs":{"bank":13,"index":11},"slab":{"bank":13,"index":11},"vertical_slab":{"bank":13,"index":11},"fence":{"bank":13,"index":11},"wall":{"bank":13,"index":11},"trapdoor":{"bank":13,"index":11},"passable_block":{"bank":13,"index":11},"placeSound":"place.deepslate_bricks"}],
    ["minecraft:deepslate_tile_double_slab", {"block":{"bank":14,"index":4},"stairs":{"bank":14,"index":4},"slab":{"bank":14,"index":4},"vertical_slab":{"bank":14,"index":4},"fence":{"bank":14,"index":4},"wall":{"bank":14,"index":4},"trapdoor":{"bank":14,"index":4},"passable_block":{"bank":14,"index":4},"placeSound":"place.deepslate_bricks"}],
    ["minecraft:deepslate_tile_slab", {"block":{"bank":14,"index":4},"stairs":{"bank":14,"index":4},"slab":{"bank":14,"index":4},"vertical_slab":{"bank":14,"index":4},"fence":{"bank":14,"index":4},"wall":{"bank":14,"index":4},"trapdoor":{"bank":14,"index":4},"passable_block":{"bank":14,"index":4},"placeSound":"place.deepslate_bricks"}],
    ["minecraft:deepslate_tile_stairs", {"block":{"bank":14,"index":4},"stairs":{"bank":14,"index":4},"slab":{"bank":14,"index":4},"vertical_slab":{"bank":14,"index":4},"fence":{"bank":14,"index":4},"wall":{"bank":14,"index":4},"trapdoor":{"bank":14,"index":4},"passable_block":{"bank":14,"index":4},"placeSound":"place.deepslate_bricks"}],
    ["minecraft:deepslate_tile_wall", {"block":{"bank":14,"index":4},"stairs":{"bank":14,"index":4},"slab":{"bank":14,"index":4},"vertical_slab":{"bank":14,"index":4},"fence":{"bank":14,"index":4},"wall":{"bank":14,"index":4},"trapdoor":{"bank":14,"index":4},"passable_block":{"bank":14,"index":4},"placeSound":"place.deepslate_bricks"}],
    ["minecraft:deepslate_tiles", {"block":{"bank":14,"index":4},"stairs":{"bank":14,"index":4},"slab":{"bank":14,"index":4},"vertical_slab":{"bank":14,"index":4},"fence":{"bank":14,"index":4},"wall":{"bank":14,"index":4},"trapdoor":{"bank":14,"index":4},"passable_block":{"bank":14,"index":4},"placeSound":"place.deepslate_bricks"}],
    ["minecraft:diamond_block", {"block":{"bank":14,"index":9},"stairs":{"bank":14,"index":9},"slab":{"bank":14,"index":9},"vertical_slab":{"bank":14,"index":9},"fence":{"bank":14,"index":9},"wall":{"bank":14,"index":9},"trapdoor":{"bank":14,"index":9},"passable_block":{"bank":14,"index":9},"placeSound":"place.stone"}],
    ["minecraft:diorite", {"block":{"bank":14,"index":11},"stairs":{"bank":14,"index":11},"slab":{"bank":14,"index":11},"vertical_slab":{"bank":14,"index":11},"fence":{"bank":14,"index":11},"wall":{"bank":14,"index":11},"trapdoor":{"bank":14,"index":11},"passable_block":{"bank":14,"index":11},"placeSound":"place.stone"}],
    ["minecraft:diorite_double_slab", {"block":{"bank":14,"index":11},"stairs":{"bank":14,"index":11},"slab":{"bank":14,"index":11},"vertical_slab":{"bank":14,"index":11},"fence":{"bank":14,"index":11},"wall":{"bank":14,"index":11},"trapdoor":{"bank":14,"index":11},"passable_block":{"bank":14,"index":11},"placeSound":"place.stone"}],
    ["minecraft:diorite_slab", {"block":{"bank":14,"index":11},"stairs":{"bank":14,"index":11},"slab":{"bank":14,"index":11},"vertical_slab":{"bank":14,"index":11},"fence":{"bank":14,"index":11},"wall":{"bank":14,"index":11},"trapdoor":{"bank":14,"index":11},"passable_block":{"bank":14,"index":11},"placeSound":"place.stone"}],
    ["minecraft:diorite_stairs", {"block":{"bank":14,"index":11},"stairs":{"bank":14,"index":11},"slab":{"bank":14,"index":11},"vertical_slab":{"bank":14,"index":11},"fence":{"bank":14,"index":11},"wall":{"bank":14,"index":11},"trapdoor":{"bank":14,"index":11},"passable_block":{"bank":14,"index":11},"placeSound":"place.stone"}],
    ["minecraft:diorite_wall", {"block":{"bank":14,"index":11},"stairs":{"bank":14,"index":11},"slab":{"bank":14,"index":11},"vertical_slab":{"bank":14,"index":11},"fence":{"bank":14,"index":11},"wall":{"bank":14,"index":11},"trapdoor":{"bank":14,"index":11},"passable_block":{"bank":14,"index":11},"placeSound":"place.stone"}],
    ["minecraft:dirt", {"block":{"bank":14,"index":12},"stairs":{"bank":14,"index":12},"slab":{"bank":14,"index":12},"vertical_slab":{"bank":14,"index":12},"fence":{"bank":14,"index":12},"wall":{"bank":14,"index":12},"trapdoor":{"bank":14,"index":12},"passable_block":{"bank":14,"index":12},"placeSound":"place.gravel"}],
    ["minecraft:double_stone_slab2", {"block":{"bank":15,"index":1},"stairs":{"bank":15,"index":1},"slab":{"bank":15,"index":1},"vertical_slab":{"bank":15,"index":1},"fence":{"bank":15,"index":1},"wall":{"bank":15,"index":1},"trapdoor":{"bank":15,"index":1},"passable_block":{"bank":15,"index":1},"placeSound":"place.stone"}],
    ["minecraft:double_stone_slab3", {"block":{"bank":15,"index":2},"stairs":{"bank":15,"index":2},"slab":{"bank":15,"index":2},"vertical_slab":{"bank":15,"index":2},"fence":{"bank":15,"index":2},"wall":{"bank":15,"index":2},"trapdoor":{"bank":15,"index":2},"passable_block":{"bank":15,"index":2},"placeSound":"place.stone"}],
    ["minecraft:double_stone_slab4", {"block":{"bank":15,"index":3},"stairs":{"bank":15,"index":3},"slab":{"bank":15,"index":3},"vertical_slab":{"bank":15,"index":3},"fence":{"bank":15,"index":3},"wall":{"bank":15,"index":3},"trapdoor":{"bank":15,"index":3},"passable_block":{"bank":15,"index":3},"placeSound":"place.stone"}],
    ["minecraft:double_wooden_slab", {"block":{"bank":3,"index":11},"stairs":{"bank":3,"index":11},"slab":{"bank":3,"index":11},"vertical_slab":{"bank":3,"index":11},"fence":{"bank":3,"index":11},"wall":{"bank":3,"index":11},"trapdoor":{"bank":3,"index":11},"passable_block":{"bank":3,"index":11},"placeSound":"place.wood"}],
    ["minecraft:emerald_block", {"block":{"bank":15,"index":8},"stairs":{"bank":15,"index":8},"slab":{"bank":15,"index":8},"vertical_slab":{"bank":15,"index":8},"fence":{"bank":15,"index":8},"wall":{"bank":15,"index":8},"trapdoor":{"bank":15,"index":8},"passable_block":{"bank":15,"index":8},"placeSound":"place.stone"}],
    ["minecraft:end_brick_stairs", {"block":{"bank":15,"index":2},"stairs":{"bank":15,"index":2},"slab":{"bank":15,"index":2},"vertical_slab":{"bank":15,"index":2},"fence":{"bank":15,"index":2},"wall":{"bank":15,"index":2},"trapdoor":{"bank":15,"index":2},"passable_block":{"bank":15,"index":2},"placeSound":"place.stone"}],
    ["minecraft:end_bricks", {"block":{"bank":15,"index":2},"stairs":{"bank":15,"index":2},"slab":{"bank":15,"index":2},"vertical_slab":{"bank":15,"index":2},"fence":{"bank":15,"index":2},"wall":{"bank":15,"index":2},"trapdoor":{"bank":15,"index":2},"passable_block":{"bank":15,"index":2},"placeSound":"place.stone"}],
    ["minecraft:end_stone", {"block":{"bank":15,"index":15},"stairs":{"bank":15,"index":15},"slab":{"bank":15,"index":15},"vertical_slab":{"bank":15,"index":15},"fence":{"bank":15,"index":15},"wall":{"bank":15,"index":15},"trapdoor":{"bank":15,"index":15},"passable_block":{"bank":15,"index":15},"placeSound":"place.stone"}],
    ["minecraft:end_stone_brick_double_slab", {"block":{"bank":15,"index":2},"stairs":{"bank":15,"index":2},"slab":{"bank":15,"index":2},"vertical_slab":{"bank":15,"index":2},"fence":{"bank":15,"index":2},"wall":{"bank":15,"index":2},"trapdoor":{"bank":15,"index":2},"passable_block":{"bank":15,"index":2},"placeSound":"place.stone"}],
    ["minecraft:end_stone_brick_slab", {"block":{"bank":15,"index":2},"stairs":{"bank":15,"index":2},"slab":{"bank":15,"index":2},"vertical_slab":{"bank":15,"index":2},"fence":{"bank":15,"index":2},"wall":{"bank":15,"index":2},"trapdoor":{"bank":15,"index":2},"passable_block":{"bank":15,"index":2},"placeSound":"place.stone"}],
    ["minecraft:end_stone_brick_wall", {"block":{"bank":15,"index":2},"stairs":{"bank":15,"index":2},"slab":{"bank":15,"index":2},"vertical_slab":{"bank":15,"index":2},"fence":{"bank":15,"index":2},"wall":{"bank":15,"index":2},"trapdoor":{"bank":15,"index":2},"passable_block":{"bank":15,"index":2},"placeSound":"place.stone"}],
    ["minecraft:fence", {"block":{"bank":3,"index":11},"stairs":{"bank":3,"index":11},"slab":{"bank":3,"index":11},"vertical_slab":{"bank":3,"index":11},"fence":{"bank":3,"index":11},"wall":{"bank":3,"index":11},"trapdoor":{"bank":3,"index":11},"passable_block":{"bank":3,"index":11},"placeSound":"place.wood"}],
    ["minecraft:fence_gate", {"block":{"bank":3,"index":11},"stairs":{"bank":3,"index":11},"slab":{"bank":3,"index":11},"vertical_slab":{"bank":3,"index":11},"fence":{"bank":3,"index":11},"wall":{"bank":3,"index":11},"trapdoor":{"bank":3,"index":11},"passable_block":{"bank":3,"index":11},"placeSound":"place.wood"}],
    ["minecraft:glass", {"block":{"bank":39,"index":8},"stairs":{"bank":39,"index":8},"slab":{"bank":39,"index":8},"vertical_slab":{"bank":39,"index":8},"fence":{"bank":39,"index":8},"wall":{"bank":39,"index":8},"trapdoor":{"bank":39,"index":8},"passable_block":{"bank":39,"index":8},"placeSound":"place.stone"}],
    ["minecraft:glowstone", {"block":{"bank":17,"index":13},"stairs":{"bank":17,"index":13},"slab":{"bank":17,"index":13},"vertical_slab":{"bank":17,"index":13},"fence":{"bank":17,"index":13},"wall":{"bank":17,"index":13},"trapdoor":{"bank":17,"index":13},"passable_block":{"bank":17,"index":13},"placeSound":"place.stone"}],
    ["minecraft:gold_block", {"block":{"bank":17,"index":14},"stairs":{"bank":17,"index":14},"slab":{"bank":17,"index":14},"vertical_slab":{"bank":17,"index":14},"fence":{"bank":17,"index":14},"wall":{"bank":17,"index":14},"trapdoor":{"bank":17,"index":14},"passable_block":{"bank":17,"index":14},"placeSound":"place.stone"}],
    ["minecraft:granite", {"block":{"bank":18,"index":1},"stairs":{"bank":18,"index":1},"slab":{"bank":18,"index":1},"vertical_slab":{"bank":18,"index":1},"fence":{"bank":18,"index":1},"wall":{"bank":18,"index":1},"trapdoor":{"bank":18,"index":1},"passable_block":{"bank":18,"index":1},"placeSound":"place.stone"}],
    ["minecraft:granite_double_slab", {"block":{"bank":18,"index":1},"stairs":{"bank":18,"index":1},"slab":{"bank":18,"index":1},"vertical_slab":{"bank":18,"index":1},"fence":{"bank":18,"index":1},"wall":{"bank":18,"index":1},"trapdoor":{"bank":18,"index":1},"passable_block":{"bank":18,"index":1},"placeSound":"place.stone"}],
    ["minecraft:granite_slab", {"block":{"bank":18,"index":1},"stairs":{"bank":18,"index":1},"slab":{"bank":18,"index":1},"vertical_slab":{"bank":18,"index":1},"fence":{"bank":18,"index":1},"wall":{"bank":18,"index":1},"trapdoor":{"bank":18,"index":1},"passable_block":{"bank":18,"index":1},"placeSound":"place.stone"}],
    ["minecraft:granite_stairs", {"block":{"bank":18,"index":1},"stairs":{"bank":18,"index":1},"slab":{"bank":18,"index":1},"vertical_slab":{"bank":18,"index":1},"fence":{"bank":18,"index":1},"wall":{"bank":18,"index":1},"trapdoor":{"bank":18,"index":1},"passable_block":{"bank":18,"index":1},"placeSound":"place.stone"}],
    ["minecraft:granite_wall", {"block":{"bank":18,"index":1},"stairs":{"bank":18,"index":1},"slab":{"bank":18,"index":1},"vertical_slab":{"bank":18,"index":1},"fence":{"bank":18,"index":1},"wall":{"bank":18,"index":1},"trapdoor":{"bank":18,"index":1},"passable_block":{"bank":18,"index":1},"placeSound":"place.stone"}],
    ["minecraft:grass", {"block":{"bank":18,"index":2},"stairs":{"bank":18,"index":2},"slab":{"bank":18,"index":2},"vertical_slab":{"bank":18,"index":2},"fence":{"bank":18,"index":2},"wall":{"bank":18,"index":2},"trapdoor":{"bank":18,"index":2},"passable_block":{"bank":18,"index":2},"placeSound":"place.grass"}],
    ["minecraft:grass_block", {"block":{"bank":18,"index":2},"stairs":{"bank":18,"index":2},"slab":{"bank":18,"index":2},"vertical_slab":{"bank":18,"index":2},"fence":{"bank":18,"index":2},"wall":{"bank":18,"index":2},"trapdoor":{"bank":18,"index":2},"passable_block":{"bank":18,"index":2},"placeSound":"place.grass"}],
    ["minecraft:gray_carpet", {"block":{"bank":18,"index":6},"stairs":{"bank":18,"index":6},"slab":{"bank":18,"index":6},"vertical_slab":{"bank":18,"index":6},"fence":{"bank":18,"index":6},"wall":{"bank":18,"index":6},"trapdoor":{"bank":18,"index":6},"passable_block":{"bank":18,"index":6},"placeSound":"place.cloth"}],
    ["minecraft:gray_concrete", {"block":{"bank":18,"index":7},"stairs":{"bank":18,"index":7},"slab":{"bank":18,"index":7},"vertical_slab":{"bank":18,"index":7},"fence":{"bank":18,"index":7},"wall":{"bank":18,"index":7},"trapdoor":{"bank":18,"index":7},"passable_block":{"bank":18,"index":7},"placeSound":"place.stone"}],
    ["minecraft:gray_stained_glass", {"block":{"bank":39,"index":10},"stairs":{"bank":39,"index":10},"slab":{"bank":39,"index":10},"vertical_slab":{"bank":39,"index":10},"fence":{"bank":39,"index":10},"wall":{"bank":39,"index":10},"trapdoor":{"bank":39,"index":10},"passable_block":{"bank":39,"index":10},"placeSound":"place.stone"}],
    ["minecraft:gray_wool", {"block":{"bank":18,"index":6},"stairs":{"bank":18,"index":6},"slab":{"bank":18,"index":6},"vertical_slab":{"bank":18,"index":6},"fence":{"bank":18,"index":6},"wall":{"bank":18,"index":6},"trapdoor":{"bank":18,"index":6},"passable_block":{"bank":18,"index":6},"placeSound":"place.cloth"}],
    ["minecraft:green_carpet", {"block":{"bank":18,"index":13},"stairs":{"bank":18,"index":13},"slab":{"bank":18,"index":13},"vertical_slab":{"bank":18,"index":13},"fence":{"bank":18,"index":13},"wall":{"bank":18,"index":13},"trapdoor":{"bank":18,"index":13},"passable_block":{"bank":18,"index":13},"placeSound":"place.cloth"}],
    ["minecraft:green_concrete", {"block":{"bank":18,"index":14},"stairs":{"bank":18,"index":14},"slab":{"bank":18,"index":14},"vertical_slab":{"bank":18,"index":14},"fence":{"bank":18,"index":14},"wall":{"bank":18,"index":14},"trapdoor":{"bank":18,"index":14},"passable_block":{"bank":18,"index":14},"placeSound":"place.stone"}],
    ["minecraft:green_stained_glass", {"block":{"bank":39,"index":12},"stairs":{"bank":39,"index":12},"slab":{"bank":39,"index":12},"vertical_slab":{"bank":39,"index":12},"fence":{"bank":39,"index":12},"wall":{"bank":39,"index":12},"trapdoor":{"bank":39,"index":12},"passable_block":{"bank":39,"index":12},"placeSound":"place.stone"}],
    ["minecraft:green_wool", {"block":{"bank":18,"index":13},"stairs":{"bank":18,"index":13},"slab":{"bank":18,"index":13},"vertical_slab":{"bank":18,"index":13},"fence":{"bank":18,"index":13},"wall":{"bank":18,"index":13},"trapdoor":{"bank":18,"index":13},"passable_block":{"bank":18,"index":13},"placeSound":"place.cloth"}],
    ["minecraft:infested_cobblestone", {"block":{"bank":9,"index":8},"stairs":{"bank":9,"index":8},"slab":{"bank":9,"index":8},"vertical_slab":{"bank":9,"index":8},"fence":{"bank":9,"index":8},"wall":{"bank":9,"index":8},"trapdoor":{"bank":9,"index":8},"passable_block":{"bank":9,"index":8},"placeSound":"place.stone"}],
    ["minecraft:infested_deepslate", {"block":{"bank":13,"index":10},"stairs":{"bank":13,"index":10},"slab":{"bank":13,"index":10},"vertical_slab":{"bank":13,"index":10},"fence":{"bank":13,"index":10},"wall":{"bank":13,"index":10},"trapdoor":{"bank":13,"index":10},"passable_block":{"bank":13,"index":10},"placeSound":"place.deepslate"}],
    ["minecraft:infested_mossy_stone_bricks", {"block":{"bank":15,"index":3},"stairs":{"bank":15,"index":3},"slab":{"bank":15,"index":3},"vertical_slab":{"bank":15,"index":3},"fence":{"bank":15,"index":3},"wall":{"bank":15,"index":3},"trapdoor":{"bank":15,"index":3},"passable_block":{"bank":15,"index":3},"placeSound":"place.stone"}],
    ["minecraft:infested_stone", {"block":{"bank":19,"index":14},"stairs":{"bank":19,"index":14},"slab":{"bank":19,"index":14},"vertical_slab":{"bank":19,"index":14},"fence":{"bank":19,"index":14},"wall":{"bank":19,"index":14},"trapdoor":{"bank":19,"index":14},"passable_block":{"bank":19,"index":14},"placeSound":"place.stone"}],
    ["minecraft:infested_stone_bricks", {"block":{"bank":19,"index":15},"stairs":{"bank":19,"index":15},"slab":{"bank":19,"index":15},"vertical_slab":{"bank":19,"index":15},"fence":{"bank":19,"index":15},"wall":{"bank":19,"index":15},"trapdoor":{"bank":19,"index":15},"passable_block":{"bank":19,"index":15},"placeSound":"place.stone"}],
    ["minecraft:invisible_bedrock", {"block":{"bank":19,"index":14},"stairs":{"bank":19,"index":14},"slab":{"bank":19,"index":14},"vertical_slab":{"bank":19,"index":14},"fence":{"bank":19,"index":14},"wall":{"bank":19,"index":14},"trapdoor":{"bank":19,"index":14},"passable_block":{"bank":19,"index":14},"placeSound":"place.stone"}],
    ["minecraft:iron_bars", {"block":{"bank":20,"index":1},"stairs":{"bank":20,"index":1},"slab":{"bank":20,"index":1},"vertical_slab":{"bank":20,"index":1},"fence":{"bank":20,"index":1},"wall":{"bank":20,"index":1},"trapdoor":{"bank":20,"index":1},"passable_block":{"bank":20,"index":1},"placeSound":"place.iron"}],
    ["minecraft:iron_block", {"block":{"bank":20,"index":2},"stairs":{"bank":20,"index":2},"slab":{"bank":20,"index":2},"vertical_slab":{"bank":20,"index":2},"fence":{"bank":20,"index":2},"wall":{"bank":20,"index":2},"trapdoor":{"bank":20,"index":2},"passable_block":{"bank":20,"index":2},"placeSound":"place.iron"}],
    ["minecraft:iron_door", {"block":{"bank":2,"index":0},"stairs":{"bank":2,"index":0},"slab":{"bank":2,"index":0},"vertical_slab":{"bank":2,"index":0},"fence":{"bank":2,"index":0},"wall":{"bank":2,"index":0},"trapdoor":{"bank":2,"index":0},"passable_block":{"bank":2,"index":0},"placeSound":"place.iron"}],
    ["minecraft:jungle_door", {"block":{"bank":2,"index":0},"stairs":{"bank":2,"index":0},"slab":{"bank":2,"index":0},"vertical_slab":{"bank":2,"index":0},"fence":{"bank":2,"index":0},"wall":{"bank":2,"index":0},"trapdoor":{"bank":2,"index":0},"passable_block":{"bank":2,"index":0},"placeSound":"place.wood"}],
    ["minecraft:jungle_double_slab", {"block":{"bank":20,"index":7},"stairs":{"bank":20,"index":7},"slab":{"bank":20,"index":7},"vertical_slab":{"bank":20,"index":7},"fence":{"bank":20,"index":7},"wall":{"bank":20,"index":7},"trapdoor":{"bank":20,"index":7},"passable_block":{"bank":20,"index":7},"placeSound":"place.wood"}],
    ["minecraft:jungle_fence", {"block":{"bank":20,"index":7},"stairs":{"bank":20,"index":7},"slab":{"bank":20,"index":7},"vertical_slab":{"bank":20,"index":7},"fence":{"bank":20,"index":7},"wall":{"bank":20,"index":7},"trapdoor":{"bank":20,"index":7},"passable_block":{"bank":20,"index":7},"placeSound":"place.wood"}],
    ["minecraft:jungle_fence_gate", {"block":{"bank":20,"index":7},"stairs":{"bank":20,"index":7},"slab":{"bank":20,"index":7},"vertical_slab":{"bank":20,"index":7},"fence":{"bank":20,"index":7},"wall":{"bank":20,"index":7},"trapdoor":{"bank":20,"index":7},"passable_block":{"bank":20,"index":7},"placeSound":"place.wood"}],
    ["minecraft:jungle_planks", {"block":{"bank":20,"index":7},"stairs":{"bank":20,"index":7},"slab":{"bank":20,"index":7},"vertical_slab":{"bank":20,"index":7},"fence":{"bank":20,"index":7},"wall":{"bank":20,"index":7},"trapdoor":{"bank":20,"index":7},"passable_block":{"bank":20,"index":7},"placeSound":"place.wood"}],
    ["minecraft:jungle_slab", {"block":{"bank":20,"index":7},"stairs":{"bank":20,"index":7},"slab":{"bank":20,"index":7},"vertical_slab":{"bank":20,"index":7},"fence":{"bank":20,"index":7},"wall":{"bank":20,"index":7},"trapdoor":{"bank":20,"index":7},"passable_block":{"bank":20,"index":7},"placeSound":"place.wood"}],
    ["minecraft:jungle_stairs", {"block":{"bank":20,"index":7},"stairs":{"bank":20,"index":7},"slab":{"bank":20,"index":7},"vertical_slab":{"bank":20,"index":7},"fence":{"bank":20,"index":7},"wall":{"bank":20,"index":7},"trapdoor":{"bank":20,"index":7},"passable_block":{"bank":20,"index":7},"placeSound":"place.wood"}],
    ["minecraft:jungle_wood", {"block":{"bank":20,"index":11},"stairs":{"bank":20,"index":11},"slab":{"bank":20,"index":11},"vertical_slab":{"bank":20,"index":11},"fence":{"bank":20,"index":11},"wall":{"bank":20,"index":11},"trapdoor":{"bank":20,"index":11},"passable_block":{"bank":20,"index":11},"placeSound":"place.wood"}],
    ["minecraft:lapis_block", {"block":{"bank":20,"index":14},"stairs":{"bank":20,"index":14},"slab":{"bank":20,"index":14},"vertical_slab":{"bank":20,"index":14},"fence":{"bank":20,"index":14},"wall":{"bank":20,"index":14},"trapdoor":{"bank":20,"index":14},"passable_block":{"bank":20,"index":14},"placeSound":"place.stone"}],
    ["minecraft:light_blue_carpet", {"block":{"bank":21,"index":4},"stairs":{"bank":21,"index":4},"slab":{"bank":21,"index":4},"vertical_slab":{"bank":21,"index":4},"fence":{"bank":21,"index":4},"wall":{"bank":21,"index":4},"trapdoor":{"bank":21,"index":4},"passable_block":{"bank":21,"index":4},"placeSound":"place.cloth"}],
    ["minecraft:light_blue_concrete", {"block":{"bank":21,"index":5},"stairs":{"bank":21,"index":5},"slab":{"bank":21,"index":5},"vertical_slab":{"bank":21,"index":5},"fence":{"bank":21,"index":5},"wall":{"bank":21,"index":5},"trapdoor":{"bank":21,"index":5},"passable_block":{"bank":21,"index":5},"placeSound":"place.stone"}],
    ["minecraft:light_blue_stained_glass", {"block":{"bank":39,"index":14},"stairs":{"bank":39,"index":14},"slab":{"bank":39,"index":14},"vertical_slab":{"bank":39,"index":14},"fence":{"bank":39,"index":14},"wall":{"bank":39,"index":14},"trapdoor":{"bank":39,"index":14},"passable_block":{"bank":39,"index":14},"placeSound":"place.stone"}],
    ["minecraft:light_blue_wool", {"block":{"bank":21,"index":4},"stairs":{"bank":21,"index":4},"slab":{"bank":21,"index":4},"vertical_slab":{"bank":21,"index":4},"fence":{"bank":21,"index":4},"wall":{"bank":21,"index":4},"trapdoor":{"bank":21,"index":4},"passable_block":{"bank":21,"index":4},"placeSound":"place.cloth"}],
    ["minecraft:light_gray_carpet", {"block":{"bank":21,"index":11},"stairs":{"bank":21,"index":11},"slab":{"bank":21,"index":11},"vertical_slab":{"bank":21,"index":11},"fence":{"bank":21,"index":11},"wall":{"bank":21,"index":11},"trapdoor":{"bank":21,"index":11},"passable_block":{"bank":21,"index":11},"placeSound":"place.cloth"}],
    ["minecraft:light_gray_concrete", {"block":{"bank":21,"index":12},"stairs":{"bank":21,"index":12},"slab":{"bank":21,"index":12},"vertical_slab":{"bank":21,"index":12},"fence":{"bank":21,"index":12},"wall":{"bank":21,"index":12},"trapdoor":{"bank":21,"index":12},"passable_block":{"bank":21,"index":12},"placeSound":"place.stone"}],
    ["minecraft:light_gray_stained_glass", {"block":{"bank":40,"index":0},"stairs":{"bank":40,"index":0},"slab":{"bank":40,"index":0},"vertical_slab":{"bank":40,"index":0},"fence":{"bank":40,"index":0},"wall":{"bank":40,"index":0},"trapdoor":{"bank":40,"index":0},"passable_block":{"bank":40,"index":0},"placeSound":"place.stone"}],
    ["minecraft:light_gray_wool", {"block":{"bank":21,"index":11},"stairs":{"bank":21,"index":11},"slab":{"bank":21,"index":11},"vertical_slab":{"bank":21,"index":11},"fence":{"bank":21,"index":11},"wall":{"bank":21,"index":11},"trapdoor":{"bank":21,"index":11},"passable_block":{"bank":21,"index":11},"placeSound":"place.cloth"}],
    ["minecraft:lime_carpet", {"block":{"bank":22,"index":3},"stairs":{"bank":22,"index":3},"slab":{"bank":22,"index":3},"vertical_slab":{"bank":22,"index":3},"fence":{"bank":22,"index":3},"wall":{"bank":22,"index":3},"trapdoor":{"bank":22,"index":3},"passable_block":{"bank":22,"index":3},"placeSound":"place.cloth"}],
    ["minecraft:lime_concrete", {"block":{"bank":22,"index":4},"stairs":{"bank":22,"index":4},"slab":{"bank":22,"index":4},"vertical_slab":{"bank":22,"index":4},"fence":{"bank":22,"index":4},"wall":{"bank":22,"index":4},"trapdoor":{"bank":22,"index":4},"passable_block":{"bank":22,"index":4},"placeSound":"place.stone"}],
    ["minecraft:lime_stained_glass", {"block":{"bank":40,"index":2},"stairs":{"bank":40,"index":2},"slab":{"bank":40,"index":2},"vertical_slab":{"bank":40,"index":2},"fence":{"bank":40,"index":2},"wall":{"bank":40,"index":2},"trapdoor":{"bank":40,"index":2},"passable_block":{"bank":40,"index":2},"placeSound":"place.stone"}],
    ["minecraft:lime_wool", {"block":{"bank":22,"index":3},"stairs":{"bank":22,"index":3},"slab":{"bank":22,"index":3},"vertical_slab":{"bank":22,"index":3},"fence":{"bank":22,"index":3},"wall":{"bank":22,"index":3},"trapdoor":{"bank":22,"index":3},"passable_block":{"bank":22,"index":3},"placeSound":"place.cloth"}],
    ["minecraft:lit_redstone_lamp", {"block":{"bank":31,"index":0},"stairs":{"bank":31,"index":0},"slab":{"bank":31,"index":0},"vertical_slab":{"bank":31,"index":0},"fence":{"bank":31,"index":0},"wall":{"bank":31,"index":0},"trapdoor":{"bank":31,"index":0},"passable_block":{"bank":31,"index":0},"placeSound":"place.stone"}],
    ["minecraft:log", {"block":{"bank":22,"index":15},"stairs":{"bank":22,"index":15},"slab":{"bank":22,"index":15},"vertical_slab":{"bank":22,"index":15},"fence":{"bank":22,"index":15},"wall":{"bank":22,"index":15},"trapdoor":{"bank":22,"index":15},"passable_block":{"bank":22,"index":15},"placeSound":"place.wood"}],
    ["minecraft:magenta_carpet", {"block":{"bank":23,"index":2},"stairs":{"bank":23,"index":2},"slab":{"bank":23,"index":2},"vertical_slab":{"bank":23,"index":2},"fence":{"bank":23,"index":2},"wall":{"bank":23,"index":2},"trapdoor":{"bank":23,"index":2},"passable_block":{"bank":23,"index":2},"placeSound":"place.cloth"}],
    ["minecraft:magenta_concrete", {"block":{"bank":23,"index":3},"stairs":{"bank":23,"index":3},"slab":{"bank":23,"index":3},"vertical_slab":{"bank":23,"index":3},"fence":{"bank":23,"index":3},"wall":{"bank":23,"index":3},"trapdoor":{"bank":23,"index":3},"passable_block":{"bank":23,"index":3},"placeSound":"place.stone"}],
    ["minecraft:magenta_stained_glass", {"block":{"bank":40,"index":4},"stairs":{"bank":40,"index":4},"slab":{"bank":40,"index":4},"vertical_slab":{"bank":40,"index":4},"fence":{"bank":40,"index":4},"wall":{"bank":40,"index":4},"trapdoor":{"bank":40,"index":4},"passable_block":{"bank":40,"index":4},"placeSound":"place.stone"}],
    ["minecraft:magenta_wool", {"block":{"bank":23,"index":2},"stairs":{"bank":23,"index":2},"slab":{"bank":23,"index":2},"vertical_slab":{"bank":23,"index":2},"fence":{"bank":23,"index":2},"wall":{"bank":23,"index":2},"trapdoor":{"bank":23,"index":2},"passable_block":{"bank":23,"index":2},"placeSound":"place.cloth"}],
    ["minecraft:mangrove_double_slab", {"block":{"bank":23,"index":10},"stairs":{"bank":23,"index":10},"slab":{"bank":23,"index":10},"vertical_slab":{"bank":23,"index":10},"fence":{"bank":23,"index":10},"wall":{"bank":23,"index":10},"trapdoor":{"bank":23,"index":10},"passable_block":{"bank":23,"index":10},"placeSound":"place.wood"}],
    ["minecraft:mangrove_fence", {"block":{"bank":23,"index":10},"stairs":{"bank":23,"index":10},"slab":{"bank":23,"index":10},"vertical_slab":{"bank":23,"index":10},"fence":{"bank":23,"index":10},"wall":{"bank":23,"index":10},"trapdoor":{"bank":23,"index":10},"passable_block":{"bank":23,"index":10},"placeSound":"place.wood"}],
    ["minecraft:mangrove_fence_gate", {"block":{"bank":23,"index":10},"stairs":{"bank":23,"index":10},"slab":{"bank":23,"index":10},"vertical_slab":{"bank":23,"index":10},"fence":{"bank":23,"index":10},"wall":{"bank":23,"index":10},"trapdoor":{"bank":23,"index":10},"passable_block":{"bank":23,"index":10},"placeSound":"place.wood"}],
    ["minecraft:mangrove_planks", {"block":{"bank":23,"index":10},"stairs":{"bank":23,"index":10},"slab":{"bank":23,"index":10},"vertical_slab":{"bank":23,"index":10},"fence":{"bank":23,"index":10},"wall":{"bank":23,"index":10},"trapdoor":{"bank":23,"index":10},"passable_block":{"bank":23,"index":10},"placeSound":"place.wood"}],
    ["minecraft:mangrove_slab", {"block":{"bank":23,"index":10},"stairs":{"bank":23,"index":10},"slab":{"bank":23,"index":10},"vertical_slab":{"bank":23,"index":10},"fence":{"bank":23,"index":10},"wall":{"bank":23,"index":10},"trapdoor":{"bank":23,"index":10},"passable_block":{"bank":23,"index":10},"placeSound":"place.wood"}],
    ["minecraft:mangrove_stairs", {"block":{"bank":23,"index":10},"stairs":{"bank":23,"index":10},"slab":{"bank":23,"index":10},"vertical_slab":{"bank":23,"index":10},"fence":{"bank":23,"index":10},"wall":{"bank":23,"index":10},"trapdoor":{"bank":23,"index":10},"passable_block":{"bank":23,"index":10},"placeSound":"place.wood"}],
    ["minecraft:mangrove_wood", {"block":{"bank":24,"index":0},"stairs":{"bank":24,"index":0},"slab":{"bank":24,"index":0},"vertical_slab":{"bank":24,"index":0},"fence":{"bank":24,"index":0},"wall":{"bank":24,"index":0},"trapdoor":{"bank":24,"index":0},"passable_block":{"bank":24,"index":0},"placeSound":"place.wood"}],
    ["minecraft:mob_spawner", {"block":{"bank":24,"index":3},"stairs":{"bank":24,"index":3},"slab":{"bank":24,"index":3},"vertical_slab":{"bank":24,"index":3},"fence":{"bank":24,"index":3},"wall":{"bank":24,"index":3},"trapdoor":{"bank":24,"index":3},"passable_block":{"bank":24,"index":3},"placeSound":"block.mob_spawner.place"}],
    ["minecraft:monster_egg", {"block":{"bank":9,"index":8},"stairs":{"bank":9,"index":8},"slab":{"bank":9,"index":8},"vertical_slab":{"bank":9,"index":8},"fence":{"bank":9,"index":8},"wall":{"bank":9,"index":8},"trapdoor":{"bank":9,"index":8},"passable_block":{"bank":9,"index":8},"placeSound":"place.stone"}],
    ["minecraft:mossy_cobblestone", {"block":{"bank":24,"index":5},"stairs":{"bank":24,"index":5},"slab":{"bank":24,"index":5},"vertical_slab":{"bank":24,"index":5},"fence":{"bank":24,"index":5},"wall":{"bank":24,"index":5},"trapdoor":{"bank":24,"index":5},"passable_block":{"bank":24,"index":5},"placeSound":"place.stone"}],
    ["minecraft:mossy_cobblestone_double_slab", {"block":{"bank":24,"index":5},"stairs":{"bank":24,"index":5},"slab":{"bank":24,"index":5},"vertical_slab":{"bank":24,"index":5},"fence":{"bank":24,"index":5},"wall":{"bank":24,"index":5},"trapdoor":{"bank":24,"index":5},"passable_block":{"bank":24,"index":5},"placeSound":"place.stone"}],
    ["minecraft:mossy_cobblestone_slab", {"block":{"bank":24,"index":5},"stairs":{"bank":24,"index":5},"slab":{"bank":24,"index":5},"vertical_slab":{"bank":24,"index":5},"fence":{"bank":24,"index":5},"wall":{"bank":24,"index":5},"trapdoor":{"bank":24,"index":5},"passable_block":{"bank":24,"index":5},"placeSound":"place.stone"}],
    ["minecraft:mossy_cobblestone_stairs", {"block":{"bank":24,"index":5},"stairs":{"bank":24,"index":5},"slab":{"bank":24,"index":5},"vertical_slab":{"bank":24,"index":5},"fence":{"bank":24,"index":5},"wall":{"bank":24,"index":5},"trapdoor":{"bank":24,"index":5},"passable_block":{"bank":24,"index":5},"placeSound":"place.stone"}],
    ["minecraft:mossy_cobblestone_wall", {"block":{"bank":24,"index":5},"stairs":{"bank":24,"index":5},"slab":{"bank":24,"index":5},"vertical_slab":{"bank":24,"index":5},"fence":{"bank":24,"index":5},"wall":{"bank":24,"index":5},"trapdoor":{"bank":24,"index":5},"passable_block":{"bank":24,"index":5},"placeSound":"place.stone"}],
    ["minecraft:mossy_stone_brick_double_slab", {"block":{"bank":15,"index":3},"stairs":{"bank":15,"index":3},"slab":{"bank":15,"index":3},"vertical_slab":{"bank":15,"index":3},"fence":{"bank":15,"index":3},"wall":{"bank":15,"index":3},"trapdoor":{"bank":15,"index":3},"passable_block":{"bank":15,"index":3},"placeSound":"place.stone"}],
    ["minecraft:mossy_stone_brick_slab", {"block":{"bank":15,"index":3},"stairs":{"bank":15,"index":3},"slab":{"bank":15,"index":3},"vertical_slab":{"bank":15,"index":3},"fence":{"bank":15,"index":3},"wall":{"bank":15,"index":3},"trapdoor":{"bank":15,"index":3},"passable_block":{"bank":15,"index":3},"placeSound":"place.stone"}],
    ["minecraft:mossy_stone_brick_stairs", {"block":{"bank":15,"index":3},"stairs":{"bank":15,"index":3},"slab":{"bank":15,"index":3},"vertical_slab":{"bank":15,"index":3},"fence":{"bank":15,"index":3},"wall":{"bank":15,"index":3},"trapdoor":{"bank":15,"index":3},"passable_block":{"bank":15,"index":3},"placeSound":"place.stone"}],
    ["minecraft:mossy_stone_brick_wall", {"block":{"bank":15,"index":3},"stairs":{"bank":15,"index":3},"slab":{"bank":15,"index":3},"vertical_slab":{"bank":15,"index":3},"fence":{"bank":15,"index":3},"wall":{"bank":15,"index":3},"trapdoor":{"bank":15,"index":3},"passable_block":{"bank":15,"index":3},"placeSound":"place.stone"}],
    ["minecraft:mossy_stone_bricks", {"block":{"bank":15,"index":3},"stairs":{"bank":15,"index":3},"slab":{"bank":15,"index":3},"vertical_slab":{"bank":15,"index":3},"fence":{"bank":15,"index":3},"wall":{"bank":15,"index":3},"trapdoor":{"bank":15,"index":3},"passable_block":{"bank":15,"index":3},"placeSound":"place.stone"}],
    ["minecraft:mud_brick_double_slab", {"block":{"bank":24,"index":7},"stairs":{"bank":24,"index":7},"slab":{"bank":24,"index":7},"vertical_slab":{"bank":24,"index":7},"fence":{"bank":24,"index":7},"wall":{"bank":24,"index":7},"trapdoor":{"bank":24,"index":7},"passable_block":{"bank":24,"index":7},"placeSound":"block.mud_bricks.place"}],
    ["minecraft:mud_brick_slab", {"block":{"bank":24,"index":7},"stairs":{"bank":24,"index":7},"slab":{"bank":24,"index":7},"vertical_slab":{"bank":24,"index":7},"fence":{"bank":24,"index":7},"wall":{"bank":24,"index":7},"trapdoor":{"bank":24,"index":7},"passable_block":{"bank":24,"index":7},"placeSound":"block.mud_bricks.place"}],
    ["minecraft:mud_brick_stairs", {"block":{"bank":24,"index":7},"stairs":{"bank":24,"index":7},"slab":{"bank":24,"index":7},"vertical_slab":{"bank":24,"index":7},"fence":{"bank":24,"index":7},"wall":{"bank":24,"index":7},"trapdoor":{"bank":24,"index":7},"passable_block":{"bank":24,"index":7},"placeSound":"block.mud_bricks.place"}],
    ["minecraft:mud_brick_wall", {"block":{"bank":24,"index":7},"stairs":{"bank":24,"index":7},"slab":{"bank":24,"index":7},"vertical_slab":{"bank":24,"index":7},"fence":{"bank":24,"index":7},"wall":{"bank":24,"index":7},"trapdoor":{"bank":24,"index":7},"passable_block":{"bank":24,"index":7},"placeSound":"block.mud_bricks.place"}],
    ["minecraft:mud_bricks", {"block":{"bank":24,"index":7},"stairs":{"bank":24,"index":7},"slab":{"bank":24,"index":7},"vertical_slab":{"bank":24,"index":7},"fence":{"bank":24,"index":7},"wall":{"bank":24,"index":7},"trapdoor":{"bank":24,"index":7},"passable_block":{"bank":24,"index":7},"placeSound":"block.mud_bricks.place"}],
    ["minecraft:nether_brick", {"block":{"bank":24,"index":10},"stairs":{"bank":24,"index":10},"slab":{"bank":24,"index":10},"vertical_slab":{"bank":24,"index":10},"fence":{"bank":24,"index":10},"wall":{"bank":24,"index":10},"trapdoor":{"bank":24,"index":10},"passable_block":{"bank":24,"index":10},"placeSound":"place.nether_brick"}],
    ["minecraft:nether_brick_double_slab", {"block":{"bank":24,"index":10},"stairs":{"bank":24,"index":10},"slab":{"bank":24,"index":10},"vertical_slab":{"bank":24,"index":10},"fence":{"bank":24,"index":10},"wall":{"bank":24,"index":10},"trapdoor":{"bank":24,"index":10},"passable_block":{"bank":24,"index":10},"placeSound":"place.stone"}],
    ["minecraft:nether_brick_fence", {"block":{"bank":24,"index":10},"stairs":{"bank":24,"index":10},"slab":{"bank":24,"index":10},"vertical_slab":{"bank":24,"index":10},"fence":{"bank":24,"index":10},"wall":{"bank":24,"index":10},"trapdoor":{"bank":24,"index":10},"passable_block":{"bank":24,"index":10},"placeSound":"place.nether_brick"}],
    ["minecraft:nether_brick_slab", {"block":{"bank":24,"index":10},"stairs":{"bank":24,"index":10},"slab":{"bank":24,"index":10},"vertical_slab":{"bank":24,"index":10},"fence":{"bank":24,"index":10},"wall":{"bank":24,"index":10},"trapdoor":{"bank":24,"index":10},"passable_block":{"bank":24,"index":10},"placeSound":"place.nether_brick"}],
    ["minecraft:nether_brick_stairs", {"block":{"bank":24,"index":10},"stairs":{"bank":24,"index":10},"slab":{"bank":24,"index":10},"vertical_slab":{"bank":24,"index":10},"fence":{"bank":24,"index":10},"wall":{"bank":24,"index":10},"trapdoor":{"bank":24,"index":10},"passable_block":{"bank":24,"index":10},"placeSound":"place.nether_brick"}],
    ["minecraft:nether_brick_wall", {"block":{"bank":24,"index":10},"stairs":{"bank":24,"index":10},"slab":{"bank":24,"index":10},"vertical_slab":{"bank":24,"index":10},"fence":{"bank":24,"index":10},"wall":{"bank":24,"index":10},"trapdoor":{"bank":24,"index":10},"passable_block":{"bank":24,"index":10},"placeSound":"place.nether_brick"}],
    ["minecraft:netherrack", {"block":{"bank":24,"index":15},"stairs":{"bank":24,"index":15},"slab":{"bank":24,"index":15},"vertical_slab":{"bank":24,"index":15},"fence":{"bank":24,"index":15},"wall":{"bank":24,"index":15},"trapdoor":{"bank":24,"index":15},"passable_block":{"bank":24,"index":15},"placeSound":"place.netherrack"}],
    ["minecraft:normal_stone_double_slab", {"block":{"bank":19,"index":14},"stairs":{"bank":19,"index":14},"slab":{"bank":19,"index":14},"vertical_slab":{"bank":19,"index":14},"fence":{"bank":19,"index":14},"wall":{"bank":19,"index":14},"trapdoor":{"bank":19,"index":14},"passable_block":{"bank":19,"index":14},"placeSound":"place.stone"}],
    ["minecraft:normal_stone_slab", {"block":{"bank":19,"index":14},"stairs":{"bank":19,"index":14},"slab":{"bank":19,"index":14},"vertical_slab":{"bank":19,"index":14},"fence":{"bank":19,"index":14},"wall":{"bank":19,"index":14},"trapdoor":{"bank":19,"index":14},"passable_block":{"bank":19,"index":14},"placeSound":"place.stone"}],
    ["minecraft:normal_stone_stairs", {"block":{"bank":19,"index":14},"stairs":{"bank":19,"index":14},"slab":{"bank":19,"index":14},"vertical_slab":{"bank":19,"index":14},"fence":{"bank":19,"index":14},"wall":{"bank":19,"index":14},"trapdoor":{"bank":19,"index":14},"passable_block":{"bank":19,"index":14},"placeSound":"place.stone"}],
    ["minecraft:oak_double_slab", {"block":{"bank":3,"index":11},"stairs":{"bank":3,"index":11},"slab":{"bank":3,"index":11},"vertical_slab":{"bank":3,"index":11},"fence":{"bank":3,"index":11},"wall":{"bank":3,"index":11},"trapdoor":{"bank":3,"index":11},"passable_block":{"bank":3,"index":11},"placeSound":"place.wood"}],
    ["minecraft:oak_fence", {"block":{"bank":3,"index":11},"stairs":{"bank":3,"index":11},"slab":{"bank":3,"index":11},"vertical_slab":{"bank":3,"index":11},"fence":{"bank":3,"index":11},"wall":{"bank":3,"index":11},"trapdoor":{"bank":3,"index":11},"passable_block":{"bank":3,"index":11},"placeSound":"place.wood"}],
    ["minecraft:oak_log", {"block":{"bank":22,"index":15},"stairs":{"bank":22,"index":15},"slab":{"bank":22,"index":15},"vertical_slab":{"bank":22,"index":15},"fence":{"bank":22,"index":15},"wall":{"bank":22,"index":15},"trapdoor":{"bank":22,"index":15},"passable_block":{"bank":22,"index":15},"placeSound":"place.wood"}],
    ["minecraft:oak_planks", {"block":{"bank":3,"index":11},"stairs":{"bank":3,"index":11},"slab":{"bank":3,"index":11},"vertical_slab":{"bank":3,"index":11},"fence":{"bank":3,"index":11},"wall":{"bank":3,"index":11},"trapdoor":{"bank":3,"index":11},"passable_block":{"bank":3,"index":11},"placeSound":"place.wood"}],
    ["minecraft:oak_slab", {"block":{"bank":3,"index":11},"stairs":{"bank":3,"index":11},"slab":{"bank":3,"index":11},"vertical_slab":{"bank":3,"index":11},"fence":{"bank":3,"index":11},"wall":{"bank":3,"index":11},"trapdoor":{"bank":3,"index":11},"passable_block":{"bank":3,"index":11},"placeSound":"place.wood"}],
    ["minecraft:oak_stairs", {"block":{"bank":3,"index":11},"stairs":{"bank":3,"index":11},"slab":{"bank":3,"index":11},"vertical_slab":{"bank":3,"index":11},"fence":{"bank":3,"index":11},"wall":{"bank":3,"index":11},"trapdoor":{"bank":3,"index":11},"passable_block":{"bank":3,"index":11},"placeSound":"place.wood"}],
    ["minecraft:oak_wood", {"block":{"bank":25,"index":3},"stairs":{"bank":25,"index":3},"slab":{"bank":25,"index":3},"vertical_slab":{"bank":25,"index":3},"fence":{"bank":25,"index":3},"wall":{"bank":25,"index":3},"trapdoor":{"bank":25,"index":3},"passable_block":{"bank":25,"index":3},"placeSound":"place.wood"}],
    ["minecraft:obsidian", {"block":{"bank":25,"index":5},"stairs":{"bank":25,"index":5},"slab":{"bank":25,"index":5},"vertical_slab":{"bank":25,"index":5},"fence":{"bank":25,"index":5},"wall":{"bank":25,"index":5},"trapdoor":{"bank":25,"index":5},"passable_block":{"bank":25,"index":5},"placeSound":"place.stone"}],
    ["minecraft:orange_carpet", {"block":{"bank":25,"index":9},"stairs":{"bank":25,"index":9},"slab":{"bank":25,"index":9},"vertical_slab":{"bank":25,"index":9},"fence":{"bank":25,"index":9},"wall":{"bank":25,"index":9},"trapdoor":{"bank":25,"index":9},"passable_block":{"bank":25,"index":9},"placeSound":"place.cloth"}],
    ["minecraft:orange_concrete", {"block":{"bank":25,"index":10},"stairs":{"bank":25,"index":10},"slab":{"bank":25,"index":10},"vertical_slab":{"bank":25,"index":10},"fence":{"bank":25,"index":10},"wall":{"bank":25,"index":10},"trapdoor":{"bank":25,"index":10},"passable_block":{"bank":25,"index":10},"placeSound":"place.stone"}],
    ["minecraft:orange_stained_glass", {"block":{"bank":40,"index":6},"stairs":{"bank":40,"index":6},"slab":{"bank":40,"index":6},"vertical_slab":{"bank":40,"index":6},"fence":{"bank":40,"index":6},"wall":{"bank":40,"index":6},"trapdoor":{"bank":40,"index":6},"passable_block":{"bank":40,"index":6},"placeSound":"place.stone"}],
    ["minecraft:orange_wool", {"block":{"bank":25,"index":9},"stairs":{"bank":25,"index":9},"slab":{"bank":25,"index":9},"vertical_slab":{"bank":25,"index":9},"fence":{"bank":25,"index":9},"wall":{"bank":25,"index":9},"trapdoor":{"bank":25,"index":9},"passable_block":{"bank":25,"index":9},"placeSound":"place.cloth"}],
    ["minecraft:packed_ice", {"block":{"bank":26,"index":12},"stairs":{"bank":26,"index":12},"slab":{"bank":26,"index":12},"vertical_slab":{"bank":26,"index":12},"fence":{"bank":26,"index":12},"wall":{"bank":26,"index":12},"trapdoor":{"bank":26,"index":12},"passable_block":{"bank":26,"index":12},"placeSound":"place.stone"}],
    ["minecraft:pale_oak_double_slab", {"block":{"bank":27,"index":1},"stairs":{"bank":27,"index":1},"slab":{"bank":27,"index":1},"vertical_slab":{"bank":27,"index":1},"fence":{"bank":27,"index":1},"wall":{"bank":27,"index":1},"trapdoor":{"bank":27,"index":1},"passable_block":{"bank":27,"index":1},"placeSound":"place.wood"}],
    ["minecraft:pale_oak_fence", {"block":{"bank":27,"index":1},"stairs":{"bank":27,"index":1},"slab":{"bank":27,"index":1},"vertical_slab":{"bank":27,"index":1},"fence":{"bank":27,"index":1},"wall":{"bank":27,"index":1},"trapdoor":{"bank":27,"index":1},"passable_block":{"bank":27,"index":1},"placeSound":"place.wood"}],
    ["minecraft:pale_oak_fence_gate", {"block":{"bank":27,"index":1},"stairs":{"bank":27,"index":1},"slab":{"bank":27,"index":1},"vertical_slab":{"bank":27,"index":1},"fence":{"bank":27,"index":1},"wall":{"bank":27,"index":1},"trapdoor":{"bank":27,"index":1},"passable_block":{"bank":27,"index":1},"placeSound":"place.wood"}],
    ["minecraft:pale_oak_planks", {"block":{"bank":27,"index":1},"stairs":{"bank":27,"index":1},"slab":{"bank":27,"index":1},"vertical_slab":{"bank":27,"index":1},"fence":{"bank":27,"index":1},"wall":{"bank":27,"index":1},"trapdoor":{"bank":27,"index":1},"passable_block":{"bank":27,"index":1},"placeSound":"place.wood"}],
    ["minecraft:pale_oak_slab", {"block":{"bank":27,"index":1},"stairs":{"bank":27,"index":1},"slab":{"bank":27,"index":1},"vertical_slab":{"bank":27,"index":1},"fence":{"bank":27,"index":1},"wall":{"bank":27,"index":1},"trapdoor":{"bank":27,"index":1},"passable_block":{"bank":27,"index":1},"placeSound":"place.wood"}],
    ["minecraft:pale_oak_stairs", {"block":{"bank":27,"index":1},"stairs":{"bank":27,"index":1},"slab":{"bank":27,"index":1},"vertical_slab":{"bank":27,"index":1},"fence":{"bank":27,"index":1},"wall":{"bank":27,"index":1},"trapdoor":{"bank":27,"index":1},"passable_block":{"bank":27,"index":1},"placeSound":"place.wood"}],
    ["minecraft:pale_oak_wood", {"block":{"bank":27,"index":5},"stairs":{"bank":27,"index":5},"slab":{"bank":27,"index":5},"vertical_slab":{"bank":27,"index":5},"fence":{"bank":27,"index":5},"wall":{"bank":27,"index":5},"trapdoor":{"bank":27,"index":5},"passable_block":{"bank":27,"index":5},"placeSound":"place.wood"}],
    ["minecraft:petrified_oak_double_slab", {"block":{"bank":3,"index":11},"stairs":{"bank":3,"index":11},"slab":{"bank":3,"index":11},"vertical_slab":{"bank":3,"index":11},"fence":{"bank":3,"index":11},"wall":{"bank":3,"index":11},"trapdoor":{"bank":3,"index":11},"passable_block":{"bank":3,"index":11},"placeSound":"place.stone"}],
    ["minecraft:petrified_oak_slab", {"block":{"bank":3,"index":11},"stairs":{"bank":3,"index":11},"slab":{"bank":3,"index":11},"vertical_slab":{"bank":3,"index":11},"fence":{"bank":3,"index":11},"wall":{"bank":3,"index":11},"trapdoor":{"bank":3,"index":11},"passable_block":{"bank":3,"index":11},"placeSound":"place.stone"}],
    ["minecraft:pink_carpet", {"block":{"bank":27,"index":9},"stairs":{"bank":27,"index":9},"slab":{"bank":27,"index":9},"vertical_slab":{"bank":27,"index":9},"fence":{"bank":27,"index":9},"wall":{"bank":27,"index":9},"trapdoor":{"bank":27,"index":9},"passable_block":{"bank":27,"index":9},"placeSound":"place.cloth"}],
    ["minecraft:pink_concrete", {"block":{"bank":27,"index":10},"stairs":{"bank":27,"index":10},"slab":{"bank":27,"index":10},"vertical_slab":{"bank":27,"index":10},"fence":{"bank":27,"index":10},"wall":{"bank":27,"index":10},"trapdoor":{"bank":27,"index":10},"passable_block":{"bank":27,"index":10},"placeSound":"place.stone"}],
    ["minecraft:pink_stained_glass", {"block":{"bank":40,"index":8},"stairs":{"bank":40,"index":8},"slab":{"bank":40,"index":8},"vertical_slab":{"bank":40,"index":8},"fence":{"bank":40,"index":8},"wall":{"bank":40,"index":8},"trapdoor":{"bank":40,"index":8},"passable_block":{"bank":40,"index":8},"placeSound":"place.stone"}],
    ["minecraft:pink_wool", {"block":{"bank":27,"index":9},"stairs":{"bank":27,"index":9},"slab":{"bank":27,"index":9},"vertical_slab":{"bank":27,"index":9},"fence":{"bank":27,"index":9},"wall":{"bank":27,"index":9},"trapdoor":{"bank":27,"index":9},"passable_block":{"bank":27,"index":9},"placeSound":"place.cloth"}],
    ["minecraft:planks", {"block":{"bank":3,"index":11},"stairs":{"bank":3,"index":11},"slab":{"bank":3,"index":11},"vertical_slab":{"bank":3,"index":11},"fence":{"bank":3,"index":11},"wall":{"bank":3,"index":11},"trapdoor":{"bank":3,"index":11},"passable_block":{"bank":3,"index":11},"placeSound":"place.wood"}],
    ["minecraft:polished_andesite", {"block":{"bank":28,"index":4},"stairs":{"bank":28,"index":4},"slab":{"bank":28,"index":4},"vertical_slab":{"bank":28,"index":4},"fence":{"bank":28,"index":4},"wall":{"bank":28,"index":4},"trapdoor":{"bank":28,"index":4},"passable_block":{"bank":28,"index":4},"placeSound":"place.stone"}],
    ["minecraft:polished_andesite_double_slab", {"block":{"bank":28,"index":4},"stairs":{"bank":28,"index":4},"slab":{"bank":28,"index":4},"vertical_slab":{"bank":28,"index":4},"fence":{"bank":28,"index":4},"wall":{"bank":28,"index":4},"trapdoor":{"bank":28,"index":4},"passable_block":{"bank":28,"index":4},"placeSound":"place.stone"}],
    ["minecraft:polished_andesite_slab", {"block":{"bank":28,"index":4},"stairs":{"bank":28,"index":4},"slab":{"bank":28,"index":4},"vertical_slab":{"bank":28,"index":4},"fence":{"bank":28,"index":4},"wall":{"bank":28,"index":4},"trapdoor":{"bank":28,"index":4},"passable_block":{"bank":28,"index":4},"placeSound":"place.stone"}],
    ["minecraft:polished_andesite_stairs", {"block":{"bank":28,"index":4},"stairs":{"bank":28,"index":4},"slab":{"bank":28,"index":4},"vertical_slab":{"bank":28,"index":4},"fence":{"bank":28,"index":4},"wall":{"bank":28,"index":4},"trapdoor":{"bank":28,"index":4},"passable_block":{"bank":28,"index":4},"placeSound":"place.stone"}],
    ["minecraft:polished_blackstone", {"block":{"bank":28,"index":6},"stairs":{"bank":28,"index":6},"slab":{"bank":28,"index":6},"vertical_slab":{"bank":28,"index":6},"fence":{"bank":28,"index":6},"wall":{"bank":28,"index":6},"trapdoor":{"bank":28,"index":6},"passable_block":{"bank":28,"index":6},"placeSound":"place.stone"}],
    ["minecraft:polished_blackstone_brick_double_slab", {"block":{"bank":28,"index":7},"stairs":{"bank":28,"index":7},"slab":{"bank":28,"index":7},"vertical_slab":{"bank":28,"index":7},"fence":{"bank":28,"index":7},"wall":{"bank":28,"index":7},"trapdoor":{"bank":28,"index":7},"passable_block":{"bank":28,"index":7},"placeSound":"place.stone"}],
    ["minecraft:polished_blackstone_brick_slab", {"block":{"bank":28,"index":7},"stairs":{"bank":28,"index":7},"slab":{"bank":28,"index":7},"vertical_slab":{"bank":28,"index":7},"fence":{"bank":28,"index":7},"wall":{"bank":28,"index":7},"trapdoor":{"bank":28,"index":7},"passable_block":{"bank":28,"index":7},"placeSound":"place.stone"}],
    ["minecraft:polished_blackstone_brick_stairs", {"block":{"bank":28,"index":7},"stairs":{"bank":28,"index":7},"slab":{"bank":28,"index":7},"vertical_slab":{"bank":28,"index":7},"fence":{"bank":28,"index":7},"wall":{"bank":28,"index":7},"trapdoor":{"bank":28,"index":7},"passable_block":{"bank":28,"index":7},"placeSound":"place.stone"}],
    ["minecraft:polished_blackstone_brick_wall", {"block":{"bank":28,"index":7},"stairs":{"bank":28,"index":7},"slab":{"bank":28,"index":7},"vertical_slab":{"bank":28,"index":7},"fence":{"bank":28,"index":7},"wall":{"bank":28,"index":7},"trapdoor":{"bank":28,"index":7},"passable_block":{"bank":28,"index":7},"placeSound":"place.stone"}],
    ["minecraft:polished_blackstone_bricks", {"block":{"bank":28,"index":7},"stairs":{"bank":28,"index":7},"slab":{"bank":28,"index":7},"vertical_slab":{"bank":28,"index":7},"fence":{"bank":28,"index":7},"wall":{"bank":28,"index":7},"trapdoor":{"bank":28,"index":7},"passable_block":{"bank":28,"index":7},"placeSound":"place.stone"}],
    ["minecraft:polished_blackstone_double_slab", {"block":{"bank":28,"index":6},"stairs":{"bank":28,"index":6},"slab":{"bank":28,"index":6},"vertical_slab":{"bank":28,"index":6},"fence":{"bank":28,"index":6},"wall":{"bank":28,"index":6},"trapdoor":{"bank":28,"index":6},"passable_block":{"bank":28,"index":6},"placeSound":"place.stone"}],
    ["minecraft:polished_blackstone_slab", {"block":{"bank":28,"index":6},"stairs":{"bank":28,"index":6},"slab":{"bank":28,"index":6},"vertical_slab":{"bank":28,"index":6},"fence":{"bank":28,"index":6},"wall":{"bank":28,"index":6},"trapdoor":{"bank":28,"index":6},"passable_block":{"bank":28,"index":6},"placeSound":"place.stone"}],
    ["minecraft:polished_blackstone_stairs", {"block":{"bank":28,"index":6},"stairs":{"bank":28,"index":6},"slab":{"bank":28,"index":6},"vertical_slab":{"bank":28,"index":6},"fence":{"bank":28,"index":6},"wall":{"bank":28,"index":6},"trapdoor":{"bank":28,"index":6},"passable_block":{"bank":28,"index":6},"placeSound":"place.stone"}],
    ["minecraft:polished_blackstone_wall", {"block":{"bank":28,"index":6},"stairs":{"bank":28,"index":6},"slab":{"bank":28,"index":6},"vertical_slab":{"bank":28,"index":6},"fence":{"bank":28,"index":6},"wall":{"bank":28,"index":6},"trapdoor":{"bank":28,"index":6},"passable_block":{"bank":28,"index":6},"placeSound":"place.stone"}],
    ["minecraft:polished_deepslate", {"block":{"bank":28,"index":9},"stairs":{"bank":28,"index":9},"slab":{"bank":28,"index":9},"vertical_slab":{"bank":28,"index":9},"fence":{"bank":28,"index":9},"wall":{"bank":28,"index":9},"trapdoor":{"bank":28,"index":9},"passable_block":{"bank":28,"index":9},"placeSound":"place.deepslate"}],
    ["minecraft:polished_deepslate_double_slab", {"block":{"bank":28,"index":9},"stairs":{"bank":28,"index":9},"slab":{"bank":28,"index":9},"vertical_slab":{"bank":28,"index":9},"fence":{"bank":28,"index":9},"wall":{"bank":28,"index":9},"trapdoor":{"bank":28,"index":9},"passable_block":{"bank":28,"index":9},"placeSound":"place.deepslate"}],
    ["minecraft:polished_deepslate_slab", {"block":{"bank":28,"index":9},"stairs":{"bank":28,"index":9},"slab":{"bank":28,"index":9},"vertical_slab":{"bank":28,"index":9},"fence":{"bank":28,"index":9},"wall":{"bank":28,"index":9},"trapdoor":{"bank":28,"index":9},"passable_block":{"bank":28,"index":9},"placeSound":"place.deepslate"}],
    ["minecraft:polished_deepslate_stairs", {"block":{"bank":28,"index":9},"stairs":{"bank":28,"index":9},"slab":{"bank":28,"index":9},"vertical_slab":{"bank":28,"index":9},"fence":{"bank":28,"index":9},"wall":{"bank":28,"index":9},"trapdoor":{"bank":28,"index":9},"passable_block":{"bank":28,"index":9},"placeSound":"place.deepslate"}],
    ["minecraft:polished_deepslate_wall", {"block":{"bank":28,"index":9},"stairs":{"bank":28,"index":9},"slab":{"bank":28,"index":9},"vertical_slab":{"bank":28,"index":9},"fence":{"bank":28,"index":9},"wall":{"bank":28,"index":9},"trapdoor":{"bank":28,"index":9},"passable_block":{"bank":28,"index":9},"placeSound":"place.deepslate"}],
    ["minecraft:polished_diorite", {"block":{"bank":28,"index":10},"stairs":{"bank":28,"index":10},"slab":{"bank":28,"index":10},"vertical_slab":{"bank":28,"index":10},"fence":{"bank":28,"index":10},"wall":{"bank":28,"index":10},"trapdoor":{"bank":28,"index":10},"passable_block":{"bank":28,"index":10},"placeSound":"place.stone"}],
    ["minecraft:polished_diorite_double_slab", {"block":{"bank":28,"index":10},"stairs":{"bank":28,"index":10},"slab":{"bank":28,"index":10},"vertical_slab":{"bank":28,"index":10},"fence":{"bank":28,"index":10},"wall":{"bank":28,"index":10},"trapdoor":{"bank":28,"index":10},"passable_block":{"bank":28,"index":10},"placeSound":"place.stone"}],
    ["minecraft:polished_diorite_slab", {"block":{"bank":28,"index":10},"stairs":{"bank":28,"index":10},"slab":{"bank":28,"index":10},"vertical_slab":{"bank":28,"index":10},"fence":{"bank":28,"index":10},"wall":{"bank":28,"index":10},"trapdoor":{"bank":28,"index":10},"passable_block":{"bank":28,"index":10},"placeSound":"place.stone"}],
    ["minecraft:polished_diorite_stairs", {"block":{"bank":28,"index":10},"stairs":{"bank":28,"index":10},"slab":{"bank":28,"index":10},"vertical_slab":{"bank":28,"index":10},"fence":{"bank":28,"index":10},"wall":{"bank":28,"index":10},"trapdoor":{"bank":28,"index":10},"passable_block":{"bank":28,"index":10},"placeSound":"place.stone"}],
    ["minecraft:polished_granite", {"block":{"bank":28,"index":11},"stairs":{"bank":28,"index":11},"slab":{"bank":28,"index":11},"vertical_slab":{"bank":28,"index":11},"fence":{"bank":28,"index":11},"wall":{"bank":28,"index":11},"trapdoor":{"bank":28,"index":11},"passable_block":{"bank":28,"index":11},"placeSound":"place.stone"}],
    ["minecraft:polished_granite_double_slab", {"block":{"bank":28,"index":11},"stairs":{"bank":28,"index":11},"slab":{"bank":28,"index":11},"vertical_slab":{"bank":28,"index":11},"fence":{"bank":28,"index":11},"wall":{"bank":28,"index":11},"trapdoor":{"bank":28,"index":11},"passable_block":{"bank":28,"index":11},"placeSound":"place.stone"}],
    ["minecraft:polished_granite_slab", {"block":{"bank":28,"index":11},"stairs":{"bank":28,"index":11},"slab":{"bank":28,"index":11},"vertical_slab":{"bank":28,"index":11},"fence":{"bank":28,"index":11},"wall":{"bank":28,"index":11},"trapdoor":{"bank":28,"index":11},"passable_block":{"bank":28,"index":11},"placeSound":"place.stone"}],
    ["minecraft:polished_granite_stairs", {"block":{"bank":28,"index":11},"stairs":{"bank":28,"index":11},"slab":{"bank":28,"index":11},"vertical_slab":{"bank":28,"index":11},"fence":{"bank":28,"index":11},"wall":{"bank":28,"index":11},"trapdoor":{"bank":28,"index":11},"passable_block":{"bank":28,"index":11},"placeSound":"place.stone"}],
    ["minecraft:polished_tuff", {"block":{"bank":28,"index":13},"stairs":{"bank":28,"index":13},"slab":{"bank":28,"index":13},"vertical_slab":{"bank":28,"index":13},"fence":{"bank":28,"index":13},"wall":{"bank":28,"index":13},"trapdoor":{"bank":28,"index":13},"passable_block":{"bank":28,"index":13},"placeSound":"place.tuff"}],
    ["minecraft:polished_tuff_double_slab", {"block":{"bank":28,"index":13},"stairs":{"bank":28,"index":13},"slab":{"bank":28,"index":13},"vertical_slab":{"bank":28,"index":13},"fence":{"bank":28,"index":13},"wall":{"bank":28,"index":13},"trapdoor":{"bank":28,"index":13},"passable_block":{"bank":28,"index":13},"placeSound":"place.tuff"}],
    ["minecraft:polished_tuff_slab", {"block":{"bank":28,"index":13},"stairs":{"bank":28,"index":13},"slab":{"bank":28,"index":13},"vertical_slab":{"bank":28,"index":13},"fence":{"bank":28,"index":13},"wall":{"bank":28,"index":13},"trapdoor":{"bank":28,"index":13},"passable_block":{"bank":28,"index":13},"placeSound":"place.tuff"}],
    ["minecraft:polished_tuff_stairs", {"block":{"bank":28,"index":13},"stairs":{"bank":28,"index":13},"slab":{"bank":28,"index":13},"vertical_slab":{"bank":28,"index":13},"fence":{"bank":28,"index":13},"wall":{"bank":28,"index":13},"trapdoor":{"bank":28,"index":13},"passable_block":{"bank":28,"index":13},"placeSound":"place.tuff"}],
    ["minecraft:polished_tuff_wall", {"block":{"bank":28,"index":13},"stairs":{"bank":28,"index":13},"slab":{"bank":28,"index":13},"vertical_slab":{"bank":28,"index":13},"fence":{"bank":28,"index":13},"wall":{"bank":28,"index":13},"trapdoor":{"bank":28,"index":13},"passable_block":{"bank":28,"index":13},"placeSound":"place.tuff"}],
    ["minecraft:prismarine", {"block":{"bank":29,"index":3},"stairs":{"bank":29,"index":3},"slab":{"bank":29,"index":3},"vertical_slab":{"bank":29,"index":3},"fence":{"bank":29,"index":3},"wall":{"bank":29,"index":3},"trapdoor":{"bank":29,"index":3},"passable_block":{"bank":29,"index":3},"placeSound":"place.stone"}],
    ["minecraft:prismarine_brick_double_slab", {"block":{"bank":29,"index":4},"stairs":{"bank":29,"index":4},"slab":{"bank":29,"index":4},"vertical_slab":{"bank":29,"index":4},"fence":{"bank":29,"index":4},"wall":{"bank":29,"index":4},"trapdoor":{"bank":29,"index":4},"passable_block":{"bank":29,"index":4},"placeSound":"place.stone"}],
    ["minecraft:prismarine_brick_slab", {"block":{"bank":29,"index":4},"stairs":{"bank":29,"index":4},"slab":{"bank":29,"index":4},"vertical_slab":{"bank":29,"index":4},"fence":{"bank":29,"index":4},"wall":{"bank":29,"index":4},"trapdoor":{"bank":29,"index":4},"passable_block":{"bank":29,"index":4},"placeSound":"place.stone"}],
    ["minecraft:prismarine_bricks", {"block":{"bank":29,"index":4},"stairs":{"bank":29,"index":4},"slab":{"bank":29,"index":4},"vertical_slab":{"bank":29,"index":4},"fence":{"bank":29,"index":4},"wall":{"bank":29,"index":4},"trapdoor":{"bank":29,"index":4},"passable_block":{"bank":29,"index":4},"placeSound":"place.stone"}],
    ["minecraft:prismarine_bricks_stairs", {"block":{"bank":29,"index":4},"stairs":{"bank":29,"index":4},"slab":{"bank":29,"index":4},"vertical_slab":{"bank":29,"index":4},"fence":{"bank":29,"index":4},"wall":{"bank":29,"index":4},"trapdoor":{"bank":29,"index":4},"passable_block":{"bank":29,"index":4},"placeSound":"place.stone"}],
    ["minecraft:prismarine_double_slab", {"block":{"bank":29,"index":3},"stairs":{"bank":29,"index":3},"slab":{"bank":29,"index":3},"vertical_slab":{"bank":29,"index":3},"fence":{"bank":29,"index":3},"wall":{"bank":29,"index":3},"trapdoor":{"bank":29,"index":3},"passable_block":{"bank":29,"index":3},"placeSound":"place.stone"}],
    ["minecraft:prismarine_slab", {"block":{"bank":29,"index":3},"stairs":{"bank":29,"index":3},"slab":{"bank":29,"index":3},"vertical_slab":{"bank":29,"index":3},"fence":{"bank":29,"index":3},"wall":{"bank":29,"index":3},"trapdoor":{"bank":29,"index":3},"passable_block":{"bank":29,"index":3},"placeSound":"place.stone"}],
    ["minecraft:prismarine_stairs", {"block":{"bank":29,"index":3},"stairs":{"bank":29,"index":3},"slab":{"bank":29,"index":3},"vertical_slab":{"bank":29,"index":3},"fence":{"bank":29,"index":3},"wall":{"bank":29,"index":3},"trapdoor":{"bank":29,"index":3},"passable_block":{"bank":29,"index":3},"placeSound":"place.stone"}],
    ["minecraft:prismarine_wall", {"block":{"bank":29,"index":3},"stairs":{"bank":29,"index":3},"slab":{"bank":29,"index":3},"vertical_slab":{"bank":29,"index":3},"fence":{"bank":29,"index":3},"wall":{"bank":29,"index":3},"trapdoor":{"bank":29,"index":3},"passable_block":{"bank":29,"index":3},"placeSound":"place.stone"}],
    ["minecraft:purple_carpet", {"block":{"bank":29,"index":6},"stairs":{"bank":29,"index":6},"slab":{"bank":29,"index":6},"vertical_slab":{"bank":29,"index":6},"fence":{"bank":29,"index":6},"wall":{"bank":29,"index":6},"trapdoor":{"bank":29,"index":6},"passable_block":{"bank":29,"index":6},"placeSound":"place.cloth"}],
    ["minecraft:purple_concrete", {"block":{"bank":29,"index":7},"stairs":{"bank":29,"index":7},"slab":{"bank":29,"index":7},"vertical_slab":{"bank":29,"index":7},"fence":{"bank":29,"index":7},"wall":{"bank":29,"index":7},"trapdoor":{"bank":29,"index":7},"passable_block":{"bank":29,"index":7},"placeSound":"place.stone"}],
    ["minecraft:purple_stained_glass", {"block":{"bank":40,"index":10},"stairs":{"bank":40,"index":10},"slab":{"bank":40,"index":10},"vertical_slab":{"bank":40,"index":10},"fence":{"bank":40,"index":10},"wall":{"bank":40,"index":10},"trapdoor":{"bank":40,"index":10},"passable_block":{"bank":40,"index":10},"placeSound":"place.stone"}],
    ["minecraft:purple_wool", {"block":{"bank":29,"index":6},"stairs":{"bank":29,"index":6},"slab":{"bank":29,"index":6},"vertical_slab":{"bank":29,"index":6},"fence":{"bank":29,"index":6},"wall":{"bank":29,"index":6},"trapdoor":{"bank":29,"index":6},"passable_block":{"bank":29,"index":6},"placeSound":"place.cloth"}],
    ["minecraft:quartz_block", {"block":{"bank":29,"index":13},"stairs":{"bank":29,"index":13},"slab":{"bank":29,"index":13},"vertical_slab":{"bank":29,"index":13},"fence":{"bank":29,"index":13},"wall":{"bank":29,"index":13},"trapdoor":{"bank":29,"index":13},"passable_block":{"bank":29,"index":13},"placeSound":"place.stone"}],
    ["minecraft:quartz_double_slab", {"block":{"bank":29,"index":13},"stairs":{"bank":29,"index":13},"slab":{"bank":29,"index":13},"vertical_slab":{"bank":29,"index":13},"fence":{"bank":29,"index":13},"wall":{"bank":29,"index":13},"trapdoor":{"bank":29,"index":13},"passable_block":{"bank":29,"index":13},"placeSound":"place.stone"}],
    ["minecraft:quartz_slab", {"block":{"bank":29,"index":13},"stairs":{"bank":29,"index":13},"slab":{"bank":29,"index":13},"vertical_slab":{"bank":29,"index":13},"fence":{"bank":29,"index":13},"wall":{"bank":29,"index":13},"trapdoor":{"bank":29,"index":13},"passable_block":{"bank":29,"index":13},"placeSound":"place.stone"}],
    ["minecraft:quartz_stairs", {"block":{"bank":29,"index":13},"stairs":{"bank":29,"index":13},"slab":{"bank":29,"index":13},"vertical_slab":{"bank":29,"index":13},"fence":{"bank":29,"index":13},"wall":{"bank":29,"index":13},"trapdoor":{"bank":29,"index":13},"passable_block":{"bank":29,"index":13},"placeSound":"place.stone"}],
    ["minecraft:red_carpet", {"block":{"bank":30,"index":6},"stairs":{"bank":30,"index":6},"slab":{"bank":30,"index":6},"vertical_slab":{"bank":30,"index":6},"fence":{"bank":30,"index":6},"wall":{"bank":30,"index":6},"trapdoor":{"bank":30,"index":6},"passable_block":{"bank":30,"index":6},"placeSound":"place.cloth"}],
    ["minecraft:red_concrete", {"block":{"bank":30,"index":7},"stairs":{"bank":30,"index":7},"slab":{"bank":30,"index":7},"vertical_slab":{"bank":30,"index":7},"fence":{"bank":30,"index":7},"wall":{"bank":30,"index":7},"trapdoor":{"bank":30,"index":7},"passable_block":{"bank":30,"index":7},"placeSound":"place.stone"}],
    ["minecraft:red_nether_brick", {"block":{"bank":30,"index":10},"stairs":{"bank":30,"index":10},"slab":{"bank":30,"index":10},"vertical_slab":{"bank":30,"index":10},"fence":{"bank":30,"index":10},"wall":{"bank":30,"index":10},"trapdoor":{"bank":30,"index":10},"passable_block":{"bank":30,"index":10},"placeSound":"place.nether_brick"}],
    ["minecraft:red_nether_brick_double_slab", {"block":{"bank":30,"index":10},"stairs":{"bank":30,"index":10},"slab":{"bank":30,"index":10},"vertical_slab":{"bank":30,"index":10},"fence":{"bank":30,"index":10},"wall":{"bank":30,"index":10},"trapdoor":{"bank":30,"index":10},"passable_block":{"bank":30,"index":10},"placeSound":"place.stone"}],
    ["minecraft:red_nether_brick_slab", {"block":{"bank":30,"index":10},"stairs":{"bank":30,"index":10},"slab":{"bank":30,"index":10},"vertical_slab":{"bank":30,"index":10},"fence":{"bank":30,"index":10},"wall":{"bank":30,"index":10},"trapdoor":{"bank":30,"index":10},"passable_block":{"bank":30,"index":10},"placeSound":"place.nether_brick"}],
    ["minecraft:red_nether_brick_stairs", {"block":{"bank":30,"index":10},"stairs":{"bank":30,"index":10},"slab":{"bank":30,"index":10},"vertical_slab":{"bank":30,"index":10},"fence":{"bank":30,"index":10},"wall":{"bank":30,"index":10},"trapdoor":{"bank":30,"index":10},"passable_block":{"bank":30,"index":10},"placeSound":"place.nether_brick"}],
    ["minecraft:red_nether_brick_wall", {"block":{"bank":30,"index":10},"stairs":{"bank":30,"index":10},"slab":{"bank":30,"index":10},"vertical_slab":{"bank":30,"index":10},"fence":{"bank":30,"index":10},"wall":{"bank":30,"index":10},"trapdoor":{"bank":30,"index":10},"passable_block":{"bank":30,"index":10},"placeSound":"place.nether_brick"}],
    ["minecraft:red_sandstone", {"block":{"bank":15,"index":1},"stairs":{"bank":15,"index":1},"slab":{"bank":15,"index":1},"vertical_slab":{"bank":15,"index":1},"fence":{"bank":15,"index":1},"wall":{"bank":15,"index":1},"trapdoor":{"bank":15,"index":1},"passable_block":{"bank":15,"index":1},"placeSound":"place.stone"}],
    ["minecraft:red_sandstone_double_slab", {"block":{"bank":15,"index":1},"stairs":{"bank":15,"index":1},"slab":{"bank":15,"index":1},"vertical_slab":{"bank":15,"index":1},"fence":{"bank":15,"index":1},"wall":{"bank":15,"index":1},"trapdoor":{"bank":15,"index":1},"passable_block":{"bank":15,"index":1},"placeSound":"place.stone"}],
    ["minecraft:red_sandstone_slab", {"block":{"bank":15,"index":1},"stairs":{"bank":15,"index":1},"slab":{"bank":15,"index":1},"vertical_slab":{"bank":15,"index":1},"fence":{"bank":15,"index":1},"wall":{"bank":15,"index":1},"trapdoor":{"bank":15,"index":1},"passable_block":{"bank":15,"index":1},"placeSound":"place.stone"}],
    ["minecraft:red_sandstone_stairs", {"block":{"bank":15,"index":1},"stairs":{"bank":15,"index":1},"slab":{"bank":15,"index":1},"vertical_slab":{"bank":15,"index":1},"fence":{"bank":15,"index":1},"wall":{"bank":15,"index":1},"trapdoor":{"bank":15,"index":1},"passable_block":{"bank":15,"index":1},"placeSound":"place.stone"}],
    ["minecraft:red_stained_glass", {"block":{"bank":40,"index":12},"stairs":{"bank":40,"index":12},"slab":{"bank":40,"index":12},"vertical_slab":{"bank":40,"index":12},"fence":{"bank":40,"index":12},"wall":{"bank":40,"index":12},"trapdoor":{"bank":40,"index":12},"passable_block":{"bank":40,"index":12},"placeSound":"place.stone"}],
    ["minecraft:red_wool", {"block":{"bank":30,"index":6},"stairs":{"bank":30,"index":6},"slab":{"bank":30,"index":6},"vertical_slab":{"bank":30,"index":6},"fence":{"bank":30,"index":6},"wall":{"bank":30,"index":6},"trapdoor":{"bank":30,"index":6},"passable_block":{"bank":30,"index":6},"placeSound":"place.cloth"}],
    ["minecraft:redstone_block", {"block":{"bank":30,"index":15},"stairs":{"bank":30,"index":15},"slab":{"bank":30,"index":15},"vertical_slab":{"bank":30,"index":15},"fence":{"bank":30,"index":15},"wall":{"bank":30,"index":15},"trapdoor":{"bank":30,"index":15},"passable_block":{"bank":30,"index":15},"placeSound":"place.stone"}],
    ["minecraft:redstone_lamp", {"block":{"bank":31,"index":0},"stairs":{"bank":31,"index":0},"slab":{"bank":31,"index":0},"vertical_slab":{"bank":31,"index":0},"fence":{"bank":31,"index":0},"wall":{"bank":31,"index":0},"trapdoor":{"bank":31,"index":0},"passable_block":{"bank":31,"index":0},"placeSound":"place.stone"}],
    ["minecraft:resin_block", {"block":{"bank":31,"index":5},"stairs":{"bank":31,"index":5},"slab":{"bank":31,"index":5},"vertical_slab":{"bank":31,"index":5},"fence":{"bank":31,"index":5},"wall":{"bank":31,"index":5},"trapdoor":{"bank":31,"index":5},"passable_block":{"bank":31,"index":5},"placeSound":"block.resin.place"}],
    ["minecraft:resin_brick_double_slab", {"block":{"bank":31,"index":6},"stairs":{"bank":31,"index":6},"slab":{"bank":31,"index":6},"vertical_slab":{"bank":31,"index":6},"fence":{"bank":31,"index":6},"wall":{"bank":31,"index":6},"trapdoor":{"bank":31,"index":6},"passable_block":{"bank":31,"index":6},"placeSound":"block.resin_brick.place"}],
    ["minecraft:resin_brick_slab", {"block":{"bank":31,"index":6},"stairs":{"bank":31,"index":6},"slab":{"bank":31,"index":6},"vertical_slab":{"bank":31,"index":6},"fence":{"bank":31,"index":6},"wall":{"bank":31,"index":6},"trapdoor":{"bank":31,"index":6},"passable_block":{"bank":31,"index":6},"placeSound":"block.resin_brick.place"}],
    ["minecraft:resin_brick_stairs", {"block":{"bank":31,"index":6},"stairs":{"bank":31,"index":6},"slab":{"bank":31,"index":6},"vertical_slab":{"bank":31,"index":6},"fence":{"bank":31,"index":6},"wall":{"bank":31,"index":6},"trapdoor":{"bank":31,"index":6},"passable_block":{"bank":31,"index":6},"placeSound":"block.resin_brick.place"}],
    ["minecraft:resin_brick_wall", {"block":{"bank":31,"index":6},"stairs":{"bank":31,"index":6},"slab":{"bank":31,"index":6},"vertical_slab":{"bank":31,"index":6},"fence":{"bank":31,"index":6},"wall":{"bank":31,"index":6},"trapdoor":{"bank":31,"index":6},"passable_block":{"bank":31,"index":6},"placeSound":"block.resin_brick.place"}],
    ["minecraft:resin_bricks", {"block":{"bank":31,"index":6},"stairs":{"bank":31,"index":6},"slab":{"bank":31,"index":6},"vertical_slab":{"bank":31,"index":6},"fence":{"bank":31,"index":6},"wall":{"bank":31,"index":6},"trapdoor":{"bank":31,"index":6},"passable_block":{"bank":31,"index":6},"placeSound":"block.resin_brick.place"}],
    ["minecraft:sandstone", {"block":{"bank":31,"index":11},"stairs":{"bank":31,"index":11},"slab":{"bank":31,"index":11},"vertical_slab":{"bank":31,"index":11},"fence":{"bank":31,"index":11},"wall":{"bank":31,"index":11},"trapdoor":{"bank":31,"index":11},"passable_block":{"bank":31,"index":11},"placeSound":"place.stone"}],
    ["minecraft:sandstone_double_slab", {"block":{"bank":31,"index":11},"stairs":{"bank":31,"index":11},"slab":{"bank":31,"index":11},"vertical_slab":{"bank":31,"index":11},"fence":{"bank":31,"index":11},"wall":{"bank":31,"index":11},"trapdoor":{"bank":31,"index":11},"passable_block":{"bank":31,"index":11},"placeSound":"place.stone"}],
    ["minecraft:sandstone_slab", {"block":{"bank":31,"index":11},"stairs":{"bank":31,"index":11},"slab":{"bank":31,"index":11},"vertical_slab":{"bank":31,"index":11},"fence":{"bank":31,"index":11},"wall":{"bank":31,"index":11},"trapdoor":{"bank":31,"index":11},"passable_block":{"bank":31,"index":11},"placeSound":"place.stone"}],
    ["minecraft:sandstone_stairs", {"block":{"bank":31,"index":11},"stairs":{"bank":31,"index":11},"slab":{"bank":31,"index":11},"vertical_slab":{"bank":31,"index":11},"fence":{"bank":31,"index":11},"wall":{"bank":31,"index":11},"trapdoor":{"bank":31,"index":11},"passable_block":{"bank":31,"index":11},"placeSound":"place.stone"}],
    ["minecraft:sea_lantern", {"block":{"bank":32,"index":3},"stairs":{"bank":32,"index":3},"slab":{"bank":32,"index":3},"vertical_slab":{"bank":32,"index":3},"fence":{"bank":32,"index":3},"wall":{"bank":32,"index":3},"trapdoor":{"bank":32,"index":3},"passable_block":{"bank":32,"index":3},"placeSound":"place.stone"}],
    ["minecraft:smooth_basalt", {"block":{"bank":32,"index":12},"stairs":{"bank":32,"index":12},"slab":{"bank":32,"index":12},"vertical_slab":{"bank":32,"index":12},"fence":{"bank":32,"index":12},"wall":{"bank":32,"index":12},"trapdoor":{"bank":32,"index":12},"passable_block":{"bank":32,"index":12},"placeSound":"place.basalt"}],
    ["minecraft:snow", {"block":{"bank":33,"index":2},"stairs":{"bank":33,"index":2},"slab":{"bank":33,"index":2},"vertical_slab":{"bank":33,"index":2},"fence":{"bank":33,"index":2},"wall":{"bank":33,"index":2},"trapdoor":{"bank":33,"index":2},"passable_block":{"bank":33,"index":2},"placeSound":"place.snow"}],
    ["minecraft:snow_layer", {"block":{"bank":33,"index":2},"stairs":{"bank":33,"index":2},"slab":{"bank":33,"index":2},"vertical_slab":{"bank":33,"index":2},"fence":{"bank":33,"index":2},"wall":{"bank":33,"index":2},"trapdoor":{"bank":33,"index":2},"passable_block":{"bank":33,"index":2},"placeSound":"place.snow"}],
    ["minecraft:spruce_door", {"block":{"bank":2,"index":0},"stairs":{"bank":2,"index":0},"slab":{"bank":2,"index":0},"vertical_slab":{"bank":2,"index":0},"fence":{"bank":2,"index":0},"wall":{"bank":2,"index":0},"trapdoor":{"bank":2,"index":0},"passable_block":{"bank":2,"index":0},"placeSound":"place.wood"}],
    ["minecraft:spruce_double_slab", {"block":{"bank":33,"index":9},"stairs":{"bank":33,"index":9},"slab":{"bank":33,"index":9},"vertical_slab":{"bank":33,"index":9},"fence":{"bank":33,"index":9},"wall":{"bank":33,"index":9},"trapdoor":{"bank":33,"index":9},"passable_block":{"bank":33,"index":9},"placeSound":"place.wood"}],
    ["minecraft:spruce_fence", {"block":{"bank":33,"index":9},"stairs":{"bank":33,"index":9},"slab":{"bank":33,"index":9},"vertical_slab":{"bank":33,"index":9},"fence":{"bank":33,"index":9},"wall":{"bank":33,"index":9},"trapdoor":{"bank":33,"index":9},"passable_block":{"bank":33,"index":9},"placeSound":"place.wood"}],
    ["minecraft:spruce_fence_gate", {"block":{"bank":33,"index":9},"stairs":{"bank":33,"index":9},"slab":{"bank":33,"index":9},"vertical_slab":{"bank":33,"index":9},"fence":{"bank":33,"index":9},"wall":{"bank":33,"index":9},"trapdoor":{"bank":33,"index":9},"passable_block":{"bank":33,"index":9},"placeSound":"place.wood"}],
    ["minecraft:spruce_log", {"block":{"bank":33,"index":10},"stairs":{"bank":33,"index":10},"slab":{"bank":33,"index":10},"vertical_slab":{"bank":33,"index":10},"fence":{"bank":33,"index":10},"wall":{"bank":33,"index":10},"trapdoor":{"bank":33,"index":10},"passable_block":{"bank":33,"index":10},"placeSound":"place.wood"}],
    ["minecraft:spruce_planks", {"block":{"bank":33,"index":9},"stairs":{"bank":33,"index":9},"slab":{"bank":33,"index":9},"vertical_slab":{"bank":33,"index":9},"fence":{"bank":33,"index":9},"wall":{"bank":33,"index":9},"trapdoor":{"bank":33,"index":9},"passable_block":{"bank":33,"index":9},"placeSound":"place.wood"}],
    ["minecraft:spruce_slab", {"block":{"bank":33,"index":9},"stairs":{"bank":33,"index":9},"slab":{"bank":33,"index":9},"vertical_slab":{"bank":33,"index":9},"fence":{"bank":33,"index":9},"wall":{"bank":33,"index":9},"trapdoor":{"bank":33,"index":9},"passable_block":{"bank":33,"index":9},"placeSound":"place.wood"}],
    ["minecraft:spruce_stairs", {"block":{"bank":33,"index":9},"stairs":{"bank":33,"index":9},"slab":{"bank":33,"index":9},"vertical_slab":{"bank":33,"index":9},"fence":{"bank":33,"index":9},"wall":{"bank":33,"index":9},"trapdoor":{"bank":33,"index":9},"passable_block":{"bank":33,"index":9},"placeSound":"place.wood"}],
    ["minecraft:spruce_wood", {"block":{"bank":33,"index":13},"stairs":{"bank":33,"index":13},"slab":{"bank":33,"index":13},"vertical_slab":{"bank":33,"index":13},"fence":{"bank":33,"index":13},"wall":{"bank":33,"index":13},"trapdoor":{"bank":33,"index":13},"passable_block":{"bank":33,"index":13},"placeSound":"place.wood"}],
    ["minecraft:stained_glass", {"block":{"bank":40,"index":14},"stairs":{"bank":40,"index":14},"slab":{"bank":40,"index":14},"vertical_slab":{"bank":40,"index":14},"fence":{"bank":40,"index":14},"wall":{"bank":40,"index":14},"trapdoor":{"bank":40,"index":14},"passable_block":{"bank":40,"index":14},"placeSound":"place.stone"}],
    ["minecraft:stone", {"block":{"bank":19,"index":14},"stairs":{"bank":19,"index":14},"slab":{"bank":19,"index":14},"vertical_slab":{"bank":19,"index":14},"fence":{"bank":19,"index":14},"wall":{"bank":19,"index":14},"trapdoor":{"bank":19,"index":14},"passable_block":{"bank":19,"index":14},"placeSound":"place.stone"}],
    ["minecraft:stone_brick_double_slab", {"block":{"bank":19,"index":15},"stairs":{"bank":19,"index":15},"slab":{"bank":19,"index":15},"vertical_slab":{"bank":19,"index":15},"fence":{"bank":19,"index":15},"wall":{"bank":19,"index":15},"trapdoor":{"bank":19,"index":15},"passable_block":{"bank":19,"index":15},"placeSound":"place.stone"}],
    ["minecraft:stone_brick_slab", {"block":{"bank":19,"index":15},"stairs":{"bank":19,"index":15},"slab":{"bank":19,"index":15},"vertical_slab":{"bank":19,"index":15},"fence":{"bank":19,"index":15},"wall":{"bank":19,"index":15},"trapdoor":{"bank":19,"index":15},"passable_block":{"bank":19,"index":15},"placeSound":"place.stone"}],
    ["minecraft:stone_brick_stairs", {"block":{"bank":19,"index":15},"stairs":{"bank":19,"index":15},"slab":{"bank":19,"index":15},"vertical_slab":{"bank":19,"index":15},"fence":{"bank":19,"index":15},"wall":{"bank":19,"index":15},"trapdoor":{"bank":19,"index":15},"passable_block":{"bank":19,"index":15},"placeSound":"place.stone"}],
    ["minecraft:stone_brick_wall", {"block":{"bank":19,"index":15},"stairs":{"bank":19,"index":15},"slab":{"bank":19,"index":15},"vertical_slab":{"bank":19,"index":15},"fence":{"bank":19,"index":15},"wall":{"bank":19,"index":15},"trapdoor":{"bank":19,"index":15},"passable_block":{"bank":19,"index":15},"placeSound":"place.stone"}],
    ["minecraft:stone_bricks", {"block":{"bank":19,"index":15},"stairs":{"bank":19,"index":15},"slab":{"bank":19,"index":15},"vertical_slab":{"bank":19,"index":15},"fence":{"bank":19,"index":15},"wall":{"bank":19,"index":15},"trapdoor":{"bank":19,"index":15},"passable_block":{"bank":19,"index":15},"placeSound":"place.stone"}],
    ["minecraft:stone_slab2", {"block":{"bank":15,"index":1},"stairs":{"bank":15,"index":1},"slab":{"bank":15,"index":1},"vertical_slab":{"bank":15,"index":1},"fence":{"bank":15,"index":1},"wall":{"bank":15,"index":1},"trapdoor":{"bank":15,"index":1},"passable_block":{"bank":15,"index":1},"placeSound":"place.stone"}],
    ["minecraft:stone_slab3", {"block":{"bank":15,"index":2},"stairs":{"bank":15,"index":2},"slab":{"bank":15,"index":2},"vertical_slab":{"bank":15,"index":2},"fence":{"bank":15,"index":2},"wall":{"bank":15,"index":2},"trapdoor":{"bank":15,"index":2},"passable_block":{"bank":15,"index":2},"placeSound":"place.stone"}],
    ["minecraft:stone_slab4", {"block":{"bank":15,"index":3},"stairs":{"bank":15,"index":3},"slab":{"bank":15,"index":3},"vertical_slab":{"bank":15,"index":3},"fence":{"bank":15,"index":3},"wall":{"bank":15,"index":3},"trapdoor":{"bank":15,"index":3},"passable_block":{"bank":15,"index":3},"placeSound":"place.stone"}],
    ["minecraft:stone_stairs", {"block":{"bank":9,"index":8},"stairs":{"bank":9,"index":8},"slab":{"bank":9,"index":8},"vertical_slab":{"bank":9,"index":8},"fence":{"bank":9,"index":8},"wall":{"bank":9,"index":8},"trapdoor":{"bank":9,"index":8},"passable_block":{"bank":9,"index":8},"placeSound":"place.stone"}],
    ["minecraft:stonebrick", {"block":{"bank":19,"index":15},"stairs":{"bank":19,"index":15},"slab":{"bank":19,"index":15},"vertical_slab":{"bank":19,"index":15},"fence":{"bank":19,"index":15},"wall":{"bank":19,"index":15},"trapdoor":{"bank":19,"index":15},"passable_block":{"bank":19,"index":15},"placeSound":"place.stone"}],
    ["minecraft:stripped_acacia_wood", {"block":{"bank":34,"index":2},"stairs":{"bank":34,"index":2},"slab":{"bank":34,"index":2},"vertical_slab":{"bank":34,"index":2},"fence":{"bank":34,"index":2},"wall":{"bank":34,"index":2},"trapdoor":{"bank":34,"index":2},"passable_block":{"bank":34,"index":2},"placeSound":"place.wood"}],
    ["minecraft:stripped_birch_wood", {"block":{"bank":34,"index":5},"stairs":{"bank":34,"index":5},"slab":{"bank":34,"index":5},"vertical_slab":{"bank":34,"index":5},"fence":{"bank":34,"index":5},"wall":{"bank":34,"index":5},"trapdoor":{"bank":34,"index":5},"passable_block":{"bank":34,"index":5},"placeSound":"place.wood"}],
    ["minecraft:stripped_cherry_wood", {"block":{"bank":34,"index":7},"stairs":{"bank":34,"index":7},"slab":{"bank":34,"index":7},"vertical_slab":{"bank":34,"index":7},"fence":{"bank":34,"index":7},"wall":{"bank":34,"index":7},"trapdoor":{"bank":34,"index":7},"passable_block":{"bank":34,"index":7},"placeSound":"place.cherry_wood"}],
    ["minecraft:stripped_crimson_hyphae", {"block":{"bank":34,"index":8},"stairs":{"bank":34,"index":8},"slab":{"bank":34,"index":8},"vertical_slab":{"bank":34,"index":8},"fence":{"bank":34,"index":8},"wall":{"bank":34,"index":8},"trapdoor":{"bank":34,"index":8},"passable_block":{"bank":34,"index":8},"placeSound":"place.stem"}],
    ["minecraft:stripped_dark_oak_wood", {"block":{"bank":34,"index":10},"stairs":{"bank":34,"index":10},"slab":{"bank":34,"index":10},"vertical_slab":{"bank":34,"index":10},"fence":{"bank":34,"index":10},"wall":{"bank":34,"index":10},"trapdoor":{"bank":34,"index":10},"passable_block":{"bank":34,"index":10},"placeSound":"place.wood"}],
    ["minecraft:stripped_jungle_wood", {"block":{"bank":34,"index":12},"stairs":{"bank":34,"index":12},"slab":{"bank":34,"index":12},"vertical_slab":{"bank":34,"index":12},"fence":{"bank":34,"index":12},"wall":{"bank":34,"index":12},"trapdoor":{"bank":34,"index":12},"passable_block":{"bank":34,"index":12},"placeSound":"place.wood"}],
    ["minecraft:stripped_mangrove_wood", {"block":{"bank":34,"index":14},"stairs":{"bank":34,"index":14},"slab":{"bank":34,"index":14},"vertical_slab":{"bank":34,"index":14},"fence":{"bank":34,"index":14},"wall":{"bank":34,"index":14},"trapdoor":{"bank":34,"index":14},"passable_block":{"bank":34,"index":14},"placeSound":"place.wood"}],
    ["minecraft:stripped_oak_wood", {"block":{"bank":35,"index":0},"stairs":{"bank":35,"index":0},"slab":{"bank":35,"index":0},"vertical_slab":{"bank":35,"index":0},"fence":{"bank":35,"index":0},"wall":{"bank":35,"index":0},"trapdoor":{"bank":35,"index":0},"passable_block":{"bank":35,"index":0},"placeSound":"place.wood"}],
    ["minecraft:stripped_pale_oak_wood", {"block":{"bank":35,"index":2},"stairs":{"bank":35,"index":2},"slab":{"bank":35,"index":2},"vertical_slab":{"bank":35,"index":2},"fence":{"bank":35,"index":2},"wall":{"bank":35,"index":2},"trapdoor":{"bank":35,"index":2},"passable_block":{"bank":35,"index":2},"placeSound":"place.wood"}],
    ["minecraft:stripped_spruce_wood", {"block":{"bank":35,"index":4},"stairs":{"bank":35,"index":4},"slab":{"bank":35,"index":4},"vertical_slab":{"bank":35,"index":4},"fence":{"bank":35,"index":4},"wall":{"bank":35,"index":4},"trapdoor":{"bank":35,"index":4},"passable_block":{"bank":35,"index":4},"placeSound":"place.wood"}],
    ["minecraft:stripped_warped_hyphae", {"block":{"bank":35,"index":5},"stairs":{"bank":35,"index":5},"slab":{"bank":35,"index":5},"vertical_slab":{"bank":35,"index":5},"fence":{"bank":35,"index":5},"wall":{"bank":35,"index":5},"trapdoor":{"bank":35,"index":5},"passable_block":{"bank":35,"index":5},"placeSound":"place.stem"}],
    ["minecraft:sulfur", {"block":{"bank":35,"index":8},"stairs":{"bank":35,"index":8},"slab":{"bank":35,"index":8},"vertical_slab":{"bank":35,"index":8},"fence":{"bank":35,"index":8},"wall":{"bank":35,"index":8},"trapdoor":{"bank":35,"index":8},"passable_block":{"bank":35,"index":8},"placeSound":"block.sulfur.place"}],
    ["minecraft:sulfur_brick_double_slab", {"block":{"bank":35,"index":9},"stairs":{"bank":35,"index":9},"slab":{"bank":35,"index":9},"vertical_slab":{"bank":35,"index":9},"fence":{"bank":35,"index":9},"wall":{"bank":35,"index":9},"trapdoor":{"bank":35,"index":9},"passable_block":{"bank":35,"index":9},"placeSound":"block.sulfur.place"}],
    ["minecraft:sulfur_brick_slab", {"block":{"bank":35,"index":9},"stairs":{"bank":35,"index":9},"slab":{"bank":35,"index":9},"vertical_slab":{"bank":35,"index":9},"fence":{"bank":35,"index":9},"wall":{"bank":35,"index":9},"trapdoor":{"bank":35,"index":9},"passable_block":{"bank":35,"index":9},"placeSound":"block.sulfur.place"}],
    ["minecraft:sulfur_brick_stairs", {"block":{"bank":35,"index":9},"stairs":{"bank":35,"index":9},"slab":{"bank":35,"index":9},"vertical_slab":{"bank":35,"index":9},"fence":{"bank":35,"index":9},"wall":{"bank":35,"index":9},"trapdoor":{"bank":35,"index":9},"passable_block":{"bank":35,"index":9},"placeSound":"block.sulfur.place"}],
    ["minecraft:sulfur_brick_wall", {"block":{"bank":35,"index":9},"stairs":{"bank":35,"index":9},"slab":{"bank":35,"index":9},"vertical_slab":{"bank":35,"index":9},"fence":{"bank":35,"index":9},"wall":{"bank":35,"index":9},"trapdoor":{"bank":35,"index":9},"passable_block":{"bank":35,"index":9},"placeSound":"block.sulfur.place"}],
    ["minecraft:sulfur_bricks", {"block":{"bank":35,"index":9},"stairs":{"bank":35,"index":9},"slab":{"bank":35,"index":9},"vertical_slab":{"bank":35,"index":9},"fence":{"bank":35,"index":9},"wall":{"bank":35,"index":9},"trapdoor":{"bank":35,"index":9},"passable_block":{"bank":35,"index":9},"placeSound":"block.sulfur.place"}],
    ["minecraft:sulfur_double_slab", {"block":{"bank":35,"index":8},"stairs":{"bank":35,"index":8},"slab":{"bank":35,"index":8},"vertical_slab":{"bank":35,"index":8},"fence":{"bank":35,"index":8},"wall":{"bank":35,"index":8},"trapdoor":{"bank":35,"index":8},"passable_block":{"bank":35,"index":8},"placeSound":"block.sulfur.place"}],
    ["minecraft:sulfur_slab", {"block":{"bank":35,"index":8},"stairs":{"bank":35,"index":8},"slab":{"bank":35,"index":8},"vertical_slab":{"bank":35,"index":8},"fence":{"bank":35,"index":8},"wall":{"bank":35,"index":8},"trapdoor":{"bank":35,"index":8},"passable_block":{"bank":35,"index":8},"placeSound":"block.sulfur.place"}],
    ["minecraft:sulfur_stairs", {"block":{"bank":35,"index":8},"stairs":{"bank":35,"index":8},"slab":{"bank":35,"index":8},"vertical_slab":{"bank":35,"index":8},"fence":{"bank":35,"index":8},"wall":{"bank":35,"index":8},"trapdoor":{"bank":35,"index":8},"passable_block":{"bank":35,"index":8},"placeSound":"block.sulfur.place"}],
    ["minecraft:sulfur_wall", {"block":{"bank":35,"index":8},"stairs":{"bank":35,"index":8},"slab":{"bank":35,"index":8},"vertical_slab":{"bank":35,"index":8},"fence":{"bank":35,"index":8},"wall":{"bank":35,"index":8},"trapdoor":{"bank":35,"index":8},"passable_block":{"bank":35,"index":8},"placeSound":"block.sulfur.place"}],
    ["minecraft:tuff", {"block":{"bank":36,"index":4},"stairs":{"bank":36,"index":4},"slab":{"bank":36,"index":4},"vertical_slab":{"bank":36,"index":4},"fence":{"bank":36,"index":4},"wall":{"bank":36,"index":4},"trapdoor":{"bank":36,"index":4},"passable_block":{"bank":36,"index":4},"placeSound":"place.tuff"}],
    ["minecraft:tuff_brick_double_slab", {"block":{"bank":36,"index":5},"stairs":{"bank":36,"index":5},"slab":{"bank":36,"index":5},"vertical_slab":{"bank":36,"index":5},"fence":{"bank":36,"index":5},"wall":{"bank":36,"index":5},"trapdoor":{"bank":36,"index":5},"passable_block":{"bank":36,"index":5},"placeSound":"place.tuff_bricks"}],
    ["minecraft:tuff_brick_slab", {"block":{"bank":36,"index":5},"stairs":{"bank":36,"index":5},"slab":{"bank":36,"index":5},"vertical_slab":{"bank":36,"index":5},"fence":{"bank":36,"index":5},"wall":{"bank":36,"index":5},"trapdoor":{"bank":36,"index":5},"passable_block":{"bank":36,"index":5},"placeSound":"place.tuff_bricks"}],
    ["minecraft:tuff_brick_stairs", {"block":{"bank":36,"index":5},"stairs":{"bank":36,"index":5},"slab":{"bank":36,"index":5},"vertical_slab":{"bank":36,"index":5},"fence":{"bank":36,"index":5},"wall":{"bank":36,"index":5},"trapdoor":{"bank":36,"index":5},"passable_block":{"bank":36,"index":5},"placeSound":"place.tuff_bricks"}],
    ["minecraft:tuff_brick_wall", {"block":{"bank":36,"index":5},"stairs":{"bank":36,"index":5},"slab":{"bank":36,"index":5},"vertical_slab":{"bank":36,"index":5},"fence":{"bank":36,"index":5},"wall":{"bank":36,"index":5},"trapdoor":{"bank":36,"index":5},"passable_block":{"bank":36,"index":5},"placeSound":"place.tuff_bricks"}],
    ["minecraft:tuff_bricks", {"block":{"bank":36,"index":5},"stairs":{"bank":36,"index":5},"slab":{"bank":36,"index":5},"vertical_slab":{"bank":36,"index":5},"fence":{"bank":36,"index":5},"wall":{"bank":36,"index":5},"trapdoor":{"bank":36,"index":5},"passable_block":{"bank":36,"index":5},"placeSound":"place.tuff_bricks"}],
    ["minecraft:tuff_double_slab", {"block":{"bank":36,"index":4},"stairs":{"bank":36,"index":4},"slab":{"bank":36,"index":4},"vertical_slab":{"bank":36,"index":4},"fence":{"bank":36,"index":4},"wall":{"bank":36,"index":4},"trapdoor":{"bank":36,"index":4},"passable_block":{"bank":36,"index":4},"placeSound":"place.tuff"}],
    ["minecraft:tuff_slab", {"block":{"bank":36,"index":4},"stairs":{"bank":36,"index":4},"slab":{"bank":36,"index":4},"vertical_slab":{"bank":36,"index":4},"fence":{"bank":36,"index":4},"wall":{"bank":36,"index":4},"trapdoor":{"bank":36,"index":4},"passable_block":{"bank":36,"index":4},"placeSound":"place.tuff"}],
    ["minecraft:tuff_stairs", {"block":{"bank":36,"index":4},"stairs":{"bank":36,"index":4},"slab":{"bank":36,"index":4},"vertical_slab":{"bank":36,"index":4},"fence":{"bank":36,"index":4},"wall":{"bank":36,"index":4},"trapdoor":{"bank":36,"index":4},"passable_block":{"bank":36,"index":4},"placeSound":"place.tuff"}],
    ["minecraft:tuff_wall", {"block":{"bank":36,"index":4},"stairs":{"bank":36,"index":4},"slab":{"bank":36,"index":4},"vertical_slab":{"bank":36,"index":4},"fence":{"bank":36,"index":4},"wall":{"bank":36,"index":4},"trapdoor":{"bank":36,"index":4},"passable_block":{"bank":36,"index":4},"placeSound":"place.tuff"}],
    ["minecraft:warped_double_slab", {"block":{"bank":36,"index":11},"stairs":{"bank":36,"index":11},"slab":{"bank":36,"index":11},"vertical_slab":{"bank":36,"index":11},"fence":{"bank":36,"index":11},"wall":{"bank":36,"index":11},"trapdoor":{"bank":36,"index":11},"passable_block":{"bank":36,"index":11},"placeSound":"place.nether_wood"}],
    ["minecraft:warped_fence", {"block":{"bank":36,"index":11},"stairs":{"bank":36,"index":11},"slab":{"bank":36,"index":11},"vertical_slab":{"bank":36,"index":11},"fence":{"bank":36,"index":11},"wall":{"bank":36,"index":11},"trapdoor":{"bank":36,"index":11},"passable_block":{"bank":36,"index":11},"placeSound":"place.nether_wood"}],
    ["minecraft:warped_fence_gate", {"block":{"bank":36,"index":11},"stairs":{"bank":36,"index":11},"slab":{"bank":36,"index":11},"vertical_slab":{"bank":36,"index":11},"fence":{"bank":36,"index":11},"wall":{"bank":36,"index":11},"trapdoor":{"bank":36,"index":11},"passable_block":{"bank":36,"index":11},"placeSound":"place.nether_wood"}],
    ["minecraft:warped_hyphae", {"block":{"bank":36,"index":13},"stairs":{"bank":36,"index":13},"slab":{"bank":36,"index":13},"vertical_slab":{"bank":36,"index":13},"fence":{"bank":36,"index":13},"wall":{"bank":36,"index":13},"trapdoor":{"bank":36,"index":13},"passable_block":{"bank":36,"index":13},"placeSound":"place.stem"}],
    ["minecraft:warped_planks", {"block":{"bank":36,"index":11},"stairs":{"bank":36,"index":11},"slab":{"bank":36,"index":11},"vertical_slab":{"bank":36,"index":11},"fence":{"bank":36,"index":11},"wall":{"bank":36,"index":11},"trapdoor":{"bank":36,"index":11},"passable_block":{"bank":36,"index":11},"placeSound":"place.nether_wood"}],
    ["minecraft:warped_slab", {"block":{"bank":36,"index":11},"stairs":{"bank":36,"index":11},"slab":{"bank":36,"index":11},"vertical_slab":{"bank":36,"index":11},"fence":{"bank":36,"index":11},"wall":{"bank":36,"index":11},"trapdoor":{"bank":36,"index":11},"passable_block":{"bank":36,"index":11},"placeSound":"place.nether_wood"}],
    ["minecraft:warped_stairs", {"block":{"bank":36,"index":11},"stairs":{"bank":36,"index":11},"slab":{"bank":36,"index":11},"vertical_slab":{"bank":36,"index":11},"fence":{"bank":36,"index":11},"wall":{"bank":36,"index":11},"trapdoor":{"bank":36,"index":11},"passable_block":{"bank":36,"index":11},"placeSound":"place.nether_wood"}],
    ["minecraft:waxed_copper", {"block":{"bank":10,"index":0},"stairs":{"bank":10,"index":0},"slab":{"bank":10,"index":0},"vertical_slab":{"bank":10,"index":0},"fence":{"bank":10,"index":0},"wall":{"bank":10,"index":0},"trapdoor":{"bank":10,"index":0},"passable_block":{"bank":10,"index":0},"placeSound":"place.copper"}],
    ["minecraft:waxed_copper_golem_statue", {"block":{"bank":10,"index":0},"stairs":{"bank":10,"index":0},"slab":{"bank":10,"index":0},"vertical_slab":{"bank":10,"index":0},"fence":{"bank":10,"index":0},"wall":{"bank":10,"index":0},"trapdoor":{"bank":10,"index":0},"passable_block":{"bank":10,"index":0},"placeSound":"place.stone"}],
    ["minecraft:waxed_copper_grate", {"block":{"bank":10,"index":5},"stairs":{"bank":10,"index":5},"slab":{"bank":10,"index":5},"vertical_slab":{"bank":10,"index":5},"fence":{"bank":10,"index":5},"wall":{"bank":10,"index":5},"trapdoor":{"bank":10,"index":5},"passable_block":{"bank":10,"index":5},"placeSound":"place.copper_grate"}],
    ["minecraft:white_carpet", {"block":{"bank":7,"index":3},"stairs":{"bank":7,"index":3},"slab":{"bank":7,"index":3},"vertical_slab":{"bank":7,"index":3},"fence":{"bank":7,"index":3},"wall":{"bank":7,"index":3},"trapdoor":{"bank":7,"index":3},"passable_block":{"bank":7,"index":3},"placeSound":"place.cloth"}],
    ["minecraft:white_concrete", {"block":{"bank":9,"index":12},"stairs":{"bank":9,"index":12},"slab":{"bank":9,"index":12},"vertical_slab":{"bank":9,"index":12},"fence":{"bank":9,"index":12},"wall":{"bank":9,"index":12},"trapdoor":{"bank":9,"index":12},"passable_block":{"bank":9,"index":12},"placeSound":"place.stone"}],
    ["minecraft:white_stained_glass", {"block":{"bank":40,"index":14},"stairs":{"bank":40,"index":14},"slab":{"bank":40,"index":14},"vertical_slab":{"bank":40,"index":14},"fence":{"bank":40,"index":14},"wall":{"bank":40,"index":14},"trapdoor":{"bank":40,"index":14},"passable_block":{"bank":40,"index":14},"placeSound":"place.stone"}],
    ["minecraft:white_wool", {"block":{"bank":7,"index":3},"stairs":{"bank":7,"index":3},"slab":{"bank":7,"index":3},"vertical_slab":{"bank":7,"index":3},"fence":{"bank":7,"index":3},"wall":{"bank":7,"index":3},"trapdoor":{"bank":7,"index":3},"passable_block":{"bank":7,"index":3},"placeSound":"place.cloth"}],
    ["minecraft:wood", {"block":{"bank":25,"index":3},"stairs":{"bank":25,"index":3},"slab":{"bank":25,"index":3},"vertical_slab":{"bank":25,"index":3},"fence":{"bank":25,"index":3},"wall":{"bank":25,"index":3},"trapdoor":{"bank":25,"index":3},"passable_block":{"bank":25,"index":3},"placeSound":"place.wood"}],
    ["minecraft:wooden_door", {"block":{"bank":2,"index":0},"stairs":{"bank":2,"index":0},"slab":{"bank":2,"index":0},"vertical_slab":{"bank":2,"index":0},"fence":{"bank":2,"index":0},"wall":{"bank":2,"index":0},"trapdoor":{"bank":2,"index":0},"passable_block":{"bank":2,"index":0},"placeSound":"place.wood"}],
    ["minecraft:wooden_slab", {"block":{"bank":3,"index":11},"stairs":{"bank":3,"index":11},"slab":{"bank":3,"index":11},"vertical_slab":{"bank":3,"index":11},"fence":{"bank":3,"index":11},"wall":{"bank":3,"index":11},"trapdoor":{"bank":3,"index":11},"passable_block":{"bank":3,"index":11},"placeSound":"place.wood"}],
    ["minecraft:wool", {"block":{"bank":7,"index":3},"stairs":{"bank":7,"index":3},"slab":{"bank":7,"index":3},"vertical_slab":{"bank":7,"index":3},"fence":{"bank":7,"index":3},"wall":{"bank":7,"index":3},"trapdoor":{"bank":7,"index":3},"passable_block":{"bank":7,"index":3},"placeSound":"place.cloth"}],
    ["minecraft:yellow_carpet", {"block":{"bank":38,"index":5},"stairs":{"bank":38,"index":5},"slab":{"bank":38,"index":5},"vertical_slab":{"bank":38,"index":5},"fence":{"bank":38,"index":5},"wall":{"bank":38,"index":5},"trapdoor":{"bank":38,"index":5},"passable_block":{"bank":38,"index":5},"placeSound":"place.cloth"}],
    ["minecraft:yellow_concrete", {"block":{"bank":38,"index":6},"stairs":{"bank":38,"index":6},"slab":{"bank":38,"index":6},"vertical_slab":{"bank":38,"index":6},"fence":{"bank":38,"index":6},"wall":{"bank":38,"index":6},"trapdoor":{"bank":38,"index":6},"passable_block":{"bank":38,"index":6},"placeSound":"place.stone"}],
    ["minecraft:yellow_stained_glass", {"block":{"bank":41,"index":1},"stairs":{"bank":41,"index":1},"slab":{"bank":41,"index":1},"vertical_slab":{"bank":41,"index":1},"fence":{"bank":41,"index":1},"wall":{"bank":41,"index":1},"trapdoor":{"bank":41,"index":1},"passable_block":{"bank":41,"index":1},"placeSound":"place.stone"}],
    ["minecraft:yellow_wool", {"block":{"bank":38,"index":5},"stairs":{"bank":38,"index":5},"slab":{"bank":38,"index":5},"vertical_slab":{"bank":38,"index":5},"fence":{"bank":38,"index":5},"wall":{"bank":38,"index":5},"trapdoor":{"bank":38,"index":5},"passable_block":{"bank":38,"index":5},"placeSound":"place.cloth"}],
]);
const pendingPlacements = new Map();
const pendingMerges = new Set();
const manualOpenPlayers = new Set();

export function parseCamoBlock(typeId) {
    for (const [shape, baseId] of Object.entries(BASE_IDS)) {
        if (typeId === baseId) return { shape, bank: 0, baseId };
        const materialMatch = typeId.slice(baseId.length).match(/^_material_(\d+)_(\d+)$/);
        if (typeId.startsWith(baseId) && materialMatch) {
            return { shape, bank: Number(materialMatch[1]), index: Number(materialMatch[2]), baseId };
        }
        if (!typeId.startsWith(baseId + "_bank_")) continue;
        const bank = Number(typeId.slice((baseId + "_bank_").length));
        if (Number.isInteger(bank) && bank > 0) return { shape, bank, baseId };
    }
}

export function bankIdentifier(baseId, bank) {
    return bank === 0 ? baseId : `${baseId}_bank_${String(bank).padStart(2, "0")}`;
}

function materialIdentifier(baseId, bank, index) {
    if (bank === 0 && index === 0) return baseId;
    return `${baseId}_material_${String(bank).padStart(2, "0")}_${String(index).padStart(2, "0")}`;
}

const BUILDING_BLOCK_IDS = new Set(["minecraft:acacia_leaves", "minecraft:acacia_log", "minecraft:acacia_planks", "minecraft:acacia_stairs", "minecraft:acacia_wood", "minecraft:allow", "minecraft:amethyst_block", "minecraft:ancient_debris", "minecraft:andesite", "minecraft:andesite_stairs", "minecraft:azalea_leaves", "minecraft:bamboo_block", "minecraft:bamboo_mosaic", "minecraft:bamboo_mosaic_stairs", "minecraft:bamboo_planks", "minecraft:bamboo_stairs", "minecraft:barrel", "minecraft:basalt", "minecraft:beacon", "minecraft:bedrock", "minecraft:bee_nest", "minecraft:beehive", "minecraft:birch_leaves", "minecraft:birch_log", "minecraft:birch_planks", "minecraft:birch_stairs", "minecraft:birch_wood", "minecraft:black_concrete", "minecraft:black_concrete_powder", "minecraft:black_glazed_terracotta", "minecraft:black_shulker_box", "minecraft:black_stained_glass", "minecraft:black_terracotta", "minecraft:black_wool", "minecraft:blackstone", "minecraft:blackstone_stairs", "minecraft:blast_furnace", "minecraft:blue_concrete", "minecraft:blue_concrete_powder", "minecraft:blue_glazed_terracotta", "minecraft:blue_ice", "minecraft:blue_shulker_box", "minecraft:blue_stained_glass", "minecraft:blue_terracotta", "minecraft:blue_wool", "minecraft:bone_block", "minecraft:bookshelf", "minecraft:border_block", "minecraft:brain_coral_block", "minecraft:brewing_stand", "minecraft:brick_block", "minecraft:brick_stairs", "minecraft:brown_concrete", "minecraft:brown_concrete_powder", "minecraft:brown_glazed_terracotta", "minecraft:brown_mushroom_block", "minecraft:brown_shulker_box", "minecraft:brown_stained_glass", "minecraft:brown_terracotta", "minecraft:brown_wool", "minecraft:bubble_column", "minecraft:bubble_coral_block", "minecraft:budding_amethyst", "minecraft:cactus", "minecraft:calcite", "minecraft:calibrated_sculk_sensor", "minecraft:camera", "minecraft:campfire", "minecraft:cartography_table", "minecraft:carved_pumpkin", "minecraft:cauldron", "minecraft:chain_command_block", "minecraft:cherry_leaves", "minecraft:cherry_log", "minecraft:cherry_planks", "minecraft:cherry_stairs", "minecraft:cherry_wood", "minecraft:chiseled_bookshelf", "minecraft:chiseled_cinnabar", "minecraft:chiseled_copper", "minecraft:chiseled_deepslate", "minecraft:chiseled_nether_bricks", "minecraft:chiseled_polished_blackstone", "minecraft:chiseled_quartz_block", "minecraft:chiseled_red_sandstone", "minecraft:chiseled_resin_bricks", "minecraft:chiseled_sandstone", "minecraft:chiseled_stone_bricks", "minecraft:chiseled_sulfur", "minecraft:chiseled_tuff", "minecraft:chiseled_tuff_bricks", "minecraft:cinnabar", "minecraft:cinnabar_brick_stairs", "minecraft:cinnabar_bricks", "minecraft:cinnabar_stairs", "minecraft:clay", "minecraft:coal_block", "minecraft:coal_ore", "minecraft:coarse_dirt", "minecraft:cobbled_deepslate", "minecraft:cobbled_deepslate_stairs", "minecraft:cobblestone", "minecraft:command_block", "minecraft:composter", "minecraft:concrete", "minecraft:concrete_powder", "minecraft:conduit", "minecraft:copper_block", "minecraft:copper_bulb", "minecraft:copper_golem_statue", "minecraft:copper_grate", "minecraft:copper_ore", "minecraft:coral_block", "minecraft:cracked_deepslate_bricks", "minecraft:cracked_deepslate_tiles", "minecraft:cracked_nether_bricks", "minecraft:cracked_polished_blackstone_bricks", "minecraft:cracked_stone_bricks", "minecraft:crafter", "minecraft:crafting_table", "minecraft:creaking_heart", "minecraft:crimson_hyphae", "minecraft:crimson_nylium", "minecraft:crimson_planks", "minecraft:crimson_stairs", "minecraft:crying_obsidian", "minecraft:cut_copper", "minecraft:cut_copper_stairs", "minecraft:cut_red_sandstone", "minecraft:cut_sandstone", "minecraft:cyan_concrete", "minecraft:cyan_concrete_powder", "minecraft:cyan_glazed_terracotta", "minecraft:cyan_shulker_box", "minecraft:cyan_stained_glass", "minecraft:cyan_terracotta", "minecraft:cyan_wool", "minecraft:dark_oak_leaves", "minecraft:dark_oak_log", "minecraft:dark_oak_planks", "minecraft:dark_oak_stairs", "minecraft:dark_oak_wood", "minecraft:dark_prismarine", "minecraft:dark_prismarine_stairs", "minecraft:daylight_detector_inverted", "minecraft:dead_brain_coral_block", "minecraft:dead_bubble_coral_block", "minecraft:dead_fire_coral_block", "minecraft:dead_horn_coral_block", "minecraft:dead_tube_coral_block", "minecraft:deepslate", "minecraft:deepslate_brick_stairs", "minecraft:deepslate_bricks", "minecraft:deepslate_coal_ore", "minecraft:deepslate_copper_ore", "minecraft:deepslate_diamond_ore", "minecraft:deepslate_emerald_ore", "minecraft:deepslate_gold_ore", "minecraft:deepslate_iron_ore", "minecraft:deepslate_lapis_ore", "minecraft:deepslate_redstone_ore", "minecraft:deepslate_tile_stairs", "minecraft:deepslate_tiles", "minecraft:deny", "minecraft:deprecated_purpur_block_1", "minecraft:deprecated_purpur_block_2", "minecraft:diamond_block", "minecraft:diamond_ore", "minecraft:diorite", "minecraft:diorite_stairs", "minecraft:dirt", "minecraft:dirt_path", "minecraft:dirt_with_roots", "minecraft:dispenser", "minecraft:double_stone_slab2", "minecraft:double_stone_slab3", "minecraft:double_stone_slab4", "minecraft:dragon_egg", "minecraft:dried_ghast", "minecraft:dripstone_block", "minecraft:dropper", "minecraft:emerald_block", "minecraft:emerald_ore", "minecraft:end_brick_stairs", "minecraft:end_bricks", "minecraft:end_portal_frame", "minecraft:end_stone", "minecraft:exposed_chiseled_copper", "minecraft:exposed_copper", "minecraft:exposed_copper_bulb", "minecraft:exposed_copper_golem_statue", "minecraft:exposed_copper_grate", "minecraft:exposed_cut_copper", "minecraft:exposed_cut_copper_stairs", "minecraft:farmland", "minecraft:fire_coral_block", "minecraft:fletching_table", "minecraft:frame", "minecraft:frog_spawn", "minecraft:frosted_ice", "minecraft:furnace", "minecraft:gilded_blackstone", "minecraft:glass", "minecraft:glow_frame", "minecraft:glow_lichen", "minecraft:glowingobsidian", "minecraft:glowstone", "minecraft:gold_block", "minecraft:gold_ore", "minecraft:granite", "minecraft:granite_stairs", "minecraft:grass", "minecraft:grass_block", "minecraft:grass_path", "minecraft:gravel", "minecraft:gray_concrete", "minecraft:gray_concrete_powder", "minecraft:gray_glazed_terracotta", "minecraft:gray_shulker_box", "minecraft:gray_stained_glass", "minecraft:gray_terracotta", "minecraft:gray_wool", "minecraft:green_concrete", "minecraft:green_concrete_powder", "minecraft:green_glazed_terracotta", "minecraft:green_shulker_box", "minecraft:green_stained_glass", "minecraft:green_terracotta", "minecraft:green_wool", "minecraft:hardened_clay", "minecraft:hay_block", "minecraft:heavy_core", "minecraft:honey_block", "minecraft:honeycomb_block", "minecraft:horn_coral_block", "minecraft:ice", "minecraft:infested_chiseled_stone_bricks", "minecraft:infested_cobblestone", "minecraft:infested_cracked_stone_bricks", "minecraft:infested_deepslate", "minecraft:infested_mossy_stone_bricks", "minecraft:infested_stone", "minecraft:infested_stone_bricks", "minecraft:info_update", "minecraft:info_update2", "minecraft:invisible_bedrock", "minecraft:iron_block", "minecraft:iron_ore", "minecraft:jigsaw", "minecraft:jukebox", "minecraft:jungle_leaves", "minecraft:jungle_log", "minecraft:jungle_planks", "minecraft:jungle_stairs", "minecraft:jungle_wood", "minecraft:lapis_block", "minecraft:lapis_ore", "minecraft:lava_cauldron", "minecraft:leaves", "minecraft:leaves2", "minecraft:lectern", "minecraft:light_blue_concrete", "minecraft:light_blue_concrete_powder", "minecraft:light_blue_glazed_terracotta", "minecraft:light_blue_shulker_box", "minecraft:light_blue_stained_glass", "minecraft:light_blue_terracotta", "minecraft:light_blue_wool", "minecraft:light_gray_concrete", "minecraft:light_gray_concrete_powder", "minecraft:light_gray_shulker_box", "minecraft:light_gray_stained_glass", "minecraft:light_gray_terracotta", "minecraft:light_gray_wool", "minecraft:lime_concrete", "minecraft:lime_concrete_powder", "minecraft:lime_glazed_terracotta", "minecraft:lime_shulker_box", "minecraft:lime_stained_glass", "minecraft:lime_terracotta", "minecraft:lime_wool", "minecraft:lit_blast_furnace", "minecraft:lit_deepslate_redstone_ore", "minecraft:lit_furnace", "minecraft:lit_pumpkin", "minecraft:lit_redstone_lamp", "minecraft:lit_redstone_ore", "minecraft:lit_smoker", "minecraft:lodestone", "minecraft:log", "minecraft:log2", "minecraft:loom", "minecraft:magenta_concrete", "minecraft:magenta_concrete_powder", "minecraft:magenta_glazed_terracotta", "minecraft:magenta_shulker_box", "minecraft:magenta_stained_glass", "minecraft:magenta_terracotta", "minecraft:magenta_wool", "minecraft:magma", "minecraft:mangrove_leaves", "minecraft:mangrove_log", "minecraft:mangrove_planks", "minecraft:mangrove_propagule", "minecraft:mangrove_roots", "minecraft:mangrove_stairs", "minecraft:mangrove_wood", "minecraft:melon_block", "minecraft:mob_spawner", "minecraft:monster_egg", "minecraft:moss_block", "minecraft:mossy_cobblestone", "minecraft:mossy_cobblestone_stairs", "minecraft:mossy_stone_brick_stairs", "minecraft:mossy_stone_bricks", "minecraft:moving_block", "minecraft:mud", "minecraft:mud_brick_stairs", "minecraft:mud_bricks", "minecraft:muddy_mangrove_roots", "minecraft:mycelium", "minecraft:nether_brick", "minecraft:nether_brick_stairs", "minecraft:nether_gold_ore", "minecraft:nether_wart_block", "minecraft:netherite_block", "minecraft:netherrack", "minecraft:netherreactor", "minecraft:normal_stone_stairs", "minecraft:noteblock", "minecraft:oak_leaves", "minecraft:oak_log", "minecraft:oak_planks", "minecraft:oak_stairs", "minecraft:oak_wood", "minecraft:observer", "minecraft:obsidian", "minecraft:ochre_froglight", "minecraft:orange_concrete", "minecraft:orange_concrete_powder", "minecraft:orange_glazed_terracotta", "minecraft:orange_shulker_box", "minecraft:orange_stained_glass", "minecraft:orange_terracotta", "minecraft:orange_wool", "minecraft:oxidized_chiseled_copper", "minecraft:oxidized_copper", "minecraft:oxidized_copper_bulb", "minecraft:oxidized_copper_golem_statue", "minecraft:oxidized_copper_grate", "minecraft:oxidized_cut_copper", "minecraft:oxidized_cut_copper_stairs", "minecraft:packed_ice", "minecraft:packed_mud", "minecraft:pale_moss_block", "minecraft:pale_oak_leaves", "minecraft:pale_oak_log", "minecraft:pale_oak_planks", "minecraft:pale_oak_stairs", "minecraft:pale_oak_wood", "minecraft:pearlescent_froglight", "minecraft:pink_concrete", "minecraft:pink_concrete_powder", "minecraft:pink_glazed_terracotta", "minecraft:pink_shulker_box", "minecraft:pink_stained_glass", "minecraft:pink_terracotta", "minecraft:pink_wool", "minecraft:piston", "minecraft:piston_arm_collision", "minecraft:planks", "minecraft:podzol", "minecraft:polished_andesite", "minecraft:polished_andesite_stairs", "minecraft:polished_basalt", "minecraft:polished_blackstone", "minecraft:polished_blackstone_brick_stairs", "minecraft:polished_blackstone_bricks", "minecraft:polished_blackstone_stairs", "minecraft:polished_cinnabar", "minecraft:polished_cinnabar_stairs", "minecraft:polished_deepslate", "minecraft:polished_deepslate_stairs", "minecraft:polished_diorite", "minecraft:polished_diorite_stairs", "minecraft:polished_granite", "minecraft:polished_granite_stairs", "minecraft:polished_sulfur", "minecraft:polished_sulfur_stairs", "minecraft:polished_tuff", "minecraft:polished_tuff_stairs", "minecraft:potent_sulfur", "minecraft:powder_snow", "minecraft:powered_comparator", "minecraft:powered_repeater", "minecraft:prismarine", "minecraft:prismarine_bricks", "minecraft:prismarine_bricks_stairs", "minecraft:prismarine_stairs", "minecraft:pumpkin", "minecraft:purple_concrete", "minecraft:purple_concrete_powder", "minecraft:purple_glazed_terracotta", "minecraft:purple_shulker_box", "minecraft:purple_stained_glass", "minecraft:purple_terracotta", "minecraft:purple_wool", "minecraft:purpur_block", "minecraft:purpur_pillar", "minecraft:purpur_stairs", "minecraft:quartz_block", "minecraft:quartz_bricks", "minecraft:quartz_ore", "minecraft:quartz_pillar", "minecraft:quartz_stairs", "minecraft:raw_copper_block", "minecraft:raw_gold_block", "minecraft:raw_iron_block", "minecraft:red_concrete", "minecraft:red_concrete_powder", "minecraft:red_glazed_terracotta", "minecraft:red_mushroom_block", "minecraft:red_nether_brick", "minecraft:red_nether_brick_stairs", "minecraft:red_sand", "minecraft:red_sandstone", "minecraft:red_sandstone_stairs", "minecraft:red_shulker_box", "minecraft:red_stained_glass", "minecraft:red_terracotta", "minecraft:red_wool", "minecraft:redstone_block", "minecraft:redstone_lamp", "minecraft:redstone_ore", "minecraft:reinforced_deepslate", "minecraft:repeating_command_block", "minecraft:reserved6", "minecraft:resin_block", "minecraft:resin_brick_stairs", "minecraft:resin_bricks", "minecraft:respawn_anchor", "minecraft:sand", "minecraft:sandstone", "minecraft:sandstone_stairs", "minecraft:sculk", "minecraft:sculk_catalyst", "minecraft:sculk_sensor", "minecraft:sculk_shrieker", "minecraft:sculk_vein", "minecraft:shroomlight", "minecraft:shulker_box", "minecraft:silver_glazed_terracotta", "minecraft:slime", "minecraft:smithing_table", "minecraft:smoker", "minecraft:smooth_basalt", "minecraft:smooth_quartz", "minecraft:smooth_quartz_stairs", "minecraft:smooth_red_sandstone", "minecraft:smooth_red_sandstone_stairs", "minecraft:smooth_sandstone", "minecraft:smooth_sandstone_stairs", "minecraft:smooth_stone", "minecraft:sniffer_egg", "minecraft:snow", "minecraft:snow_layer", "minecraft:soul_campfire", "minecraft:soul_sand", "minecraft:soul_soil", "minecraft:sponge", "minecraft:spruce_leaves", "minecraft:spruce_log", "minecraft:spruce_planks", "minecraft:spruce_stairs", "minecraft:spruce_wood", "minecraft:stained_glass", "minecraft:stained_hardened_clay", "minecraft:sticky_piston", "minecraft:sticky_piston_arm_collision", "minecraft:stone", "minecraft:stone_brick_stairs", "minecraft:stone_bricks", "minecraft:stone_slab2", "minecraft:stone_slab3", "minecraft:stone_slab4", "minecraft:stone_stairs", "minecraft:stonebrick", "minecraft:stonecutter_block", "minecraft:stripped_acacia_log", "minecraft:stripped_acacia_wood", "minecraft:stripped_bamboo_block", "minecraft:stripped_birch_log", "minecraft:stripped_birch_wood", "minecraft:stripped_cherry_log", "minecraft:stripped_cherry_wood", "minecraft:stripped_crimson_hyphae", "minecraft:stripped_dark_oak_log", "minecraft:stripped_dark_oak_wood", "minecraft:stripped_jungle_log", "minecraft:stripped_jungle_wood", "minecraft:stripped_mangrove_log", "minecraft:stripped_mangrove_wood", "minecraft:stripped_oak_log", "minecraft:stripped_oak_wood", "minecraft:stripped_pale_oak_log", "minecraft:stripped_pale_oak_wood", "minecraft:stripped_spruce_log", "minecraft:stripped_spruce_wood", "minecraft:stripped_warped_hyphae", "minecraft:structure_block", "minecraft:sulfur", "minecraft:sulfur_brick_stairs", "minecraft:sulfur_bricks", "minecraft:sulfur_spike", "minecraft:sulfur_stairs", "minecraft:suspicious_gravel", "minecraft:suspicious_sand", "minecraft:target", "minecraft:tinted_glass", "minecraft:tnt", "minecraft:trial_spawner", "minecraft:tube_coral_block", "minecraft:tuff", "minecraft:tuff_brick_stairs", "minecraft:tuff_bricks", "minecraft:tuff_stairs", "minecraft:turtle_egg", "minecraft:undyed_shulker_box", "minecraft:unpowered_comparator", "minecraft:unpowered_repeater", "minecraft:vault", "minecraft:verdant_froglight", "minecraft:warped_hyphae", "minecraft:warped_nylium", "minecraft:warped_planks", "minecraft:warped_stairs", "minecraft:warped_wart_block", "minecraft:waxed_chiseled_copper", "minecraft:waxed_copper", "minecraft:waxed_copper_bulb", "minecraft:waxed_copper_golem_statue", "minecraft:waxed_copper_grate", "minecraft:waxed_cut_copper", "minecraft:waxed_cut_copper_stairs", "minecraft:waxed_exposed_chiseled_copper", "minecraft:waxed_exposed_copper", "minecraft:waxed_exposed_copper_bulb", "minecraft:waxed_exposed_copper_golem_statue", "minecraft:waxed_exposed_copper_grate", "minecraft:waxed_exposed_cut_copper", "minecraft:waxed_exposed_cut_copper_stairs", "minecraft:waxed_oxidized_chiseled_copper", "minecraft:waxed_oxidized_copper", "minecraft:waxed_oxidized_copper_bulb", "minecraft:waxed_oxidized_copper_golem_statue", "minecraft:waxed_oxidized_copper_grate", "minecraft:waxed_oxidized_cut_copper", "minecraft:waxed_oxidized_cut_copper_stairs", "minecraft:waxed_weathered_chiseled_copper", "minecraft:waxed_weathered_copper", "minecraft:waxed_weathered_copper_bulb", "minecraft:waxed_weathered_copper_golem_statue", "minecraft:waxed_weathered_copper_grate", "minecraft:waxed_weathered_cut_copper", "minecraft:waxed_weathered_cut_copper_stairs", "minecraft:weathered_chiseled_copper", "minecraft:weathered_copper", "minecraft:weathered_copper_bulb", "minecraft:weathered_copper_golem_statue", "minecraft:weathered_copper_grate", "minecraft:weathered_cut_copper", "minecraft:weathered_cut_copper_stairs", "minecraft:wet_sponge", "minecraft:white_concrete", "minecraft:white_concrete_powder", "minecraft:white_glazed_terracotta", "minecraft:white_shulker_box", "minecraft:white_stained_glass", "minecraft:white_terracotta", "minecraft:white_wool", "minecraft:wood", "minecraft:wool", "minecraft:yellow_concrete", "minecraft:yellow_concrete_powder", "minecraft:yellow_glazed_terracotta", "minecraft:yellow_shulker_box", "minecraft:yellow_stained_glass", "minecraft:yellow_terracotta", "minecraft:yellow_wool"]);

function isBuildingBlock(block) {
    if (!block || block.isAir || block.isLiquid) return false;
    const camo = parseCamoBlock(block.typeId);
    if (camo) {
        return camo.shape === "block" || camo.shape === "stairs" ||
            ((camo.shape === "slab" || camo.shape === "vertical_slab") &&
             block.permutation.getState(SHAPE_STATE) === (camo.shape === "slab" ? 1 : 4));
    }
    // isSolid is a beta-only property. This catalogue is available in stable.
    if (!BUILDING_BLOCK_IDS.has(block.typeId)) return false;
    const name = block.typeId.split(":")[1];
    if (name?.endsWith("double_slab")) return true;
    if (/(?:^|_)(?:door|fence|fence_gate|wall|slab|pane|bars|trapdoor|carpet|chest|anvil|bed|cake|pot|lantern|bell|hopper|shelf|grindstone|stonecutter|enchanting_table|daylight_detector)$/.test(name)) return false;
    return !["iron_bars", "glass_pane", "brewing_stand", "cauldron", "water_cauldron", "lava_cauldron", "composter"].includes(name);
}

function canConnect(camo, neighbor) {
    if (!neighbor) return false;
    const neighborCamo = parseCamoBlock(neighbor.typeId);
    if (neighborCamo) {
        return neighborCamo.shape === "block" ||
            neighborCamo.shape === "fence" ||
            neighborCamo.shape === "wall";
    }
    try {
        if (neighbor.permutation.hasTag("minecraft:has_fence_connections")) return true;
    } catch {}
    if (/(?:^|_)(?:fence|fence_gate|wall)$/.test(neighbor.typeId.split(":")[1])) return true;
    return isBuildingBlock(neighbor);
}

function updateConnections(block) {
    if (!block) return;
    const camo = parseCamoBlock(block.typeId);
    if (!camo || (camo.shape !== "fence" && camo.shape !== "wall")) return;
    let permutation = block.permutation;
    let changed = false;
    for (const [direction, offset] of CONNECTION_DIRECTIONS) {
        let neighbor;
        try {
            neighbor = block.dimension.getBlock({
                x: block.location.x + offset.x,
                y: block.location.y,
                z: block.location.z + offset.z,
            });
        } catch {
            continue;
        }
        const state = `kedu:connection_${direction}`;
        const connected = canConnect(camo, neighbor);
        if (permutation.getState(state) === connected) continue;
        permutation = permutation.withState(state, connected);
        changed = true;
    }
    if (camo.shape === "wall") {
        let above;
        try { above = block.above(); } catch {}
        const aboveCamo = above && parseCamoBlock(above.typeId);
        const aboveWall = aboveCamo?.shape === "wall" || /_wall$/.test(above?.typeId ?? "");
        const value = aboveWall ? 2 : above && !above.isAir && !above.isLiquid ? 1 : 0;
        if (permutation.getState("kedu:wall_above") !== value) {
            permutation = permutation.withState("kedu:wall_above", value);
            changed = true;
        }
    }
    if (changed) block.setPermutation(permutation);
}

export function refreshConnections(dimension, location) {
    const locations = [location, { ...location, y: location.y - 1 }, { ...location, y: location.y + 1 }, ...CONNECTION_DIRECTIONS.map(([, offset]) => ({
        x: location.x + offset.x,
        y: location.y,
        z: location.z + offset.z,
    }))];
    for (const current of locations) {
        try {
            updateConnections(dimension.getBlock(current));
        } catch {}
    }
}

function normalizeFace(face) {
    return String(face).toLowerCase();
}

function placementLocation(block, face) {
    const offsets = {
        north: { x: 0, y: 0, z: -1 },
        south: { x: 0, y: 0, z: 1 },
        east: { x: 1, y: 0, z: 0 },
        west: { x: -1, y: 0, z: 0 },
        up: { x: 0, y: 1, z: 0 },
        down: { x: 0, y: -1, z: 0 },
    };
    const offset = offsets[normalizeFace(face)];
    if (!offset) return;
    return {
        x: block.location.x + offset.x,
        y: block.location.y + offset.y,
        z: block.location.z + offset.z,
    };
}

function verticalShape(face, faceLocation, viewDirection) {
    const clickedFace = normalizeFace(face);
    if (clickedFace === "north") return 0;
    if (clickedFace === "south") return 1;
    if (clickedFace === "east") return 2;
    if (clickedFace === "west") return 3;
    if (Math.abs(viewDirection.z) >= Math.abs(viewDirection.x)) {
        return faceLocation.z < 0.5 ? 0 : 1;
    }
    return faceLocation.x < 0.5 ? 3 : 2;
}

function queuePlacement(event, camo) {
    if (event.isFirstEvent === false || camo.shape !== "vertical_slab") return;
    const location = placementLocation(event.block, event.blockFace);
    if (!location) return;
    const token = `${system.currentTick}:${location.x},${location.y},${location.z}`;
    pendingPlacements.set(event.player.id, {
        typeId: event.itemStack.typeId,
        shape: camo.shape,
        value: verticalShape(event.blockFace, event.faceLocation, event.player.getViewDirection()),
        location,
        targetLocation: { ...event.block.location },
        token,
    });
    system.runTimeout(() => {
        if (pendingPlacements.get(event.player.id)?.token === token) {
            pendingPlacements.delete(event.player.id);
        }
    }, 5);
}

function tryDirectVerticalPlacement(event, camo) {
    if (event.isFirstEvent === false || camo.shape !== "vertical_slab" || camo.index !== undefined || camo.bank !== 0) return false;
    const location = placementLocation(event.block, event.blockFace);
    if (!location) return false;
    let destination;
    try {
        destination = event.block.dimension.getBlock(location);
    } catch {
        return false;
    }
    // A stable before-place event is not available. For the common air-target case,
    // cancel vanilla placement and write the final permutation in the next safe phase.
    if (!destination || destination.typeId !== "minecraft:air") return false;
    const value = verticalShape(event.blockFace, event.faceLocation, event.player.getViewDirection());
    const dimension = event.block.dimension;
    const player = event.player;
    const baseId = camo.baseId;
    event.cancel = true;
    system.run(() => {
        try {
            if (player.getGameMode() !== GameMode.Creative) {
                const inventory = player.getComponent("minecraft:inventory")?.container;
                const currentItem = inventory?.getItem(player.selectedSlotIndex);
                if (!currentItem || currentItem.typeId !== baseId) return;
            }
            const block = dimension.getBlock(location);
            if (!block || block.typeId !== "minecraft:air") return;
            block.setPermutation(BlockPermutation.resolve(baseId, {
                [MATERIAL_STATE]: 0,
                [SHAPE_STATE]: value,
            }));
            consumeBaseItem(player, baseId);
            dimension.playSound("place.wood", {
                x: location.x + 0.5,
                y: location.y + 0.5,
                z: location.z + 0.5,
            }, { volume: 0.8, pitch: 1.0 });
            refreshConnections(dimension, location);
        } catch {}
    });
    return true;
}

function consumeBaseItem(player, baseId) {
    if (player.getGameMode() === GameMode.Creative) return;
    const inventory = player.getComponent("minecraft:inventory")?.container;
    if (!inventory) return;
    const slot = player.selectedSlotIndex;
    const item = inventory.getItem(slot);
    if (!item || item.typeId !== baseId) return;
    if (item.amount > 1) {
        item.amount--;
        inventory.setItem(slot, item);
    } else {
        inventory.setItem(slot);
    }
}

function tryMerge(event, camo) {
    if (!event.isFirstEvent || event.itemStack?.typeId !== camo.baseId) return false;
    let merge = false;
    const value = event.block.permutation.getState(SHAPE_STATE);
    const face = normalizeFace(event.blockFace);
    if (camo.shape === "slab") {
        const half = event.block.permutation.getState("minecraft:vertical_half");
        merge = value === 0 && ((half === "bottom" && face === "up") || (half === "top" && face === "down"));
    } else if (camo.shape === "vertical_slab") {
        merge = value < 4 && face === ["north", "south", "east", "west"][value];
    }
    if (!merge) return false;

    event.cancel = true;
    const { x, y, z } = event.block.location;
    const key = `${event.block.dimension.id}:${x},${y},${z}`;
    if (pendingMerges.has(key)) return true;
    pendingMerges.add(key);
    const dimension = event.block.dimension;
    const player = event.player;
    system.run(() => {
        try {
            const block = dimension.getBlock({ x, y, z });
            const current = block && parseCamoBlock(block.typeId);
            if (!current || current.shape !== camo.shape) return;
            block.setPermutation(block.permutation.withState(SHAPE_STATE, camo.shape === "slab" ? 1 : 4));
            consumeBaseItem(player, camo.baseId);
            dimension.playSound("place.wood", { x: x + 0.5, y: y + 0.5, z: z + 0.5 }, { volume: 0.8, pitch: 0.9 });
        } finally {
            pendingMerges.delete(key);
        }
    });
    return true;
}

function tryToggleTrapdoor(event, camo) {
    if (event.isFirstEvent === false || camo.shape !== "trapdoor") return false;
    event.cancel = true;
    const { x, y, z } = event.block.location;
    const dimension = event.block.dimension;
    system.run(() => {
        const block = dimension.getBlock({ x, y, z });
        const current = block && parseCamoBlock(block.typeId);
        if (!current || current.shape !== "trapdoor") return;
        const state = block.permutation.getState(TRAPDOOR_STATE) ?? false;
        const opening = !state;
        block.setPermutation(block.permutation.withState(TRAPDOOR_STATE, opening));
        dimension.playSound(opening ? "open.wooden_trapdoor" : "close.wooden_trapdoor", { x: x + 0.5, y: y + 0.5, z: z + 0.5 }, { volume: 0.9, pitch: 1.0 });
    });
    return true;
}

function tryApplyTexture(event, camo) {
    if (event.isFirstEvent === false) return false;
    const materialGroup = MATERIALS.get(event.itemStack?.typeId);
    const material = materialGroup?.[camo.shape];
    if (!material || !materialGroup) return false;
    if (camo.bank > 0 || event.block.permutation.getState(MATERIAL_STATE) !== 0) return false;
    event.cancel = true;
    const { x, y, z } = event.block.location;
    const dimension = event.block.dimension;
    system.run(() => {
        const block = dimension.getBlock({ x, y, z });
        const current = block && parseCamoBlock(block.typeId);
        if (!current || current.shape !== camo.shape) return;
        const states = block.permutation.getAllStates();
        states[MATERIAL_STATE] = material.index;
        block.setPermutation(
            BlockPermutation.resolve(materialIdentifier(current.baseId, material.bank, material.index), states),
        );
        refreshLampPower(block);
        dimension.playSound(materialGroup.placeSound, { x: x + 0.5, y: y + 0.5, z: z + 0.5 }, { volume: 1.0, pitch: 1.0 });
        refreshConnections(dimension, { x, y, z });
    });
    return true;
}

function tryRemoveTexture(event, camo) {
    if (event.isFirstEvent === false || event.itemStack?.typeId !== TOOL_ID) return false;
    event.cancel = true;
    const { x, y, z } = event.block.location;
    const dimension = event.block.dimension;
    system.run(() => {
        const block = dimension.getBlock({ x, y, z });
        const current = block && parseCamoBlock(block.typeId);
        if (!current || current.shape !== camo.shape) return;
        const states = block.permutation.getAllStates();
        delete states["kedu:powered"];
        states[MATERIAL_STATE] = 0;
        block.setPermutation(BlockPermutation.resolve(current.baseId, states));
        dimension.playSound("dig.wood", { x: x + 0.5, y: y + 0.5, z: z + 0.5 }, {
            volume: 0.8,
            pitch: 1.35,
        });
        refreshConnections(dimension, { x, y, z });
    });
    return true;
}

function giveManual(player) {
    try {
        const inventory = player.getComponent("minecraft:inventory")?.container;
        if (!inventory) {
            system.runTimeout(() => giveManual(player), 20);
            return;
        }
        for (let slot = 0; slot < inventory.size; slot++) {
            if (inventory.getItem(slot)?.typeId === MANUAL_ID) return;
        }
        const leftover = inventory.addItem(new ItemStack(MANUAL_ID, 1));
        if (leftover) player.dimension.spawnItem(leftover, player.location);
    } catch {}
}

function tr(key) {
    return { translate: key };
}

function raw(...parts) {
    return {
        rawtext: parts.map(part => typeof part === "string" ? { text: part } : part),
    };
}

async function showManualPage(player, page) {
    const response = await new ActionFormData()
        .title(tr(page.title))
        .header(tr(page.header))
        .label(tr(page.body))
        .divider()
        .button(tr("kedu.guide.button.back"))
        .button(tr("kedu.guide.button.close"))
        .show(player);
    if (!response.canceled && response.selection === 0) await showManualMain(player);
}

async function showToolsGuide(player) {
    const pages = [
        { title: "kedu.guide.measure.title", header: "kedu.guide.measure.header", body: "kedu.guide.measure.body" },
        { title: "kedu.guide.wrench.title", header: "kedu.guide.wrench.header", body: "kedu.guide.wrench.body" },
        { title: "kedu.guide.trowel.title", header: "kedu.guide.trowel.header", body: "kedu.guide.trowel.body" },
        { title: "kedu.guide.brush.title", header: "kedu.guide.brush.header", body: "kedu.guide.brush.body" },
        { title: "kedu.guide.mover.title", header: "kedu.guide.mover.header", body: "kedu.guide.mover.body" },
        { title: "kedu.guide.cloud.title", header: "kedu.guide.cloud.header", body: "kedu.guide.cloud.body" },
    ];
    const form = new ActionFormData()
        .title(tr("kedu.guide.tools.title"))
        .header(tr("kedu.guide.tools.header"))
        .label(tr("kedu.guide.tools.body"))
        .divider();
    for (const key of ["measure", "wrench", "trowel", "brush", "mover", "cloud"]) {
        form.button(tr(`kedu.guide.button.${key}`));
    }
    form.button(tr("kedu.guide.button.index"));
    form.button(tr("kedu.guide.button.close"));
    const response = await form.show(player);
    if (response.canceled) return;
    if (response.selection >= 0 && response.selection < pages.length) {
        const page = pages[response.selection];
        const back = await new ActionFormData()
            .title(tr(page.title)).header(tr(page.header)).label(tr(page.body)).divider()
            .button(tr("kedu.guide.button.back_tools"))
            .button(tr("kedu.guide.button.index"))
            .button(tr("kedu.guide.button.close"))
            .show(player);
        if (!back.canceled && back.selection === 0) await showToolsGuide(player);
        else if (!back.canceled && back.selection === 1) await showManualMain(player);
    } else if (response.selection === pages.length) {
        await showManualMain(player);
    }
}

async function showCompatibleBlocks(player, pageIndex = 0) {
    const pageCount = Math.ceil(COMPATIBLE_BLOCK_IDS.length / COMPATIBLE_BLOCKS_PER_PAGE);
    const safePage = Math.max(0, Math.min(pageIndex, pageCount - 1));
    const first = safePage * COMPATIBLE_BLOCKS_PER_PAGE;
    const blockList = COMPATIBLE_BLOCK_IDS.slice(first, first + COMPATIBLE_BLOCKS_PER_PAGE)
        .map((id, index) => `${first + index + 1}. ${id}`)
        .join("\n");
    const form = new ActionFormData()
        .title(tr("kedu.guide.compat_list.title"))
        .header(raw(tr("kedu.guide.compat_list.page"), ` ${safePage + 1}/${pageCount}`))
        .label(blockList)
        .divider();
    const actions = [];
    if (safePage > 0) {
        form.button(tr("kedu.guide.button.previous"));
        actions.push(() => showCompatibleBlocks(player, safePage - 1));
    }
    if (safePage + 1 < pageCount) {
        form.button(tr("kedu.guide.button.next"));
        actions.push(() => showCompatibleBlocks(player, safePage + 1));
    }
    form.button(tr("kedu.guide.button.compatibility"));
    actions.push(() => showCompatibility(player));
    form.button(tr("kedu.guide.button.index"));
    actions.push(() => showManualMain(player));
    form.button(tr("kedu.guide.button.close"));
    actions.push(undefined);
    const response = await form.show(player);
    if (!response.canceled && actions[response.selection]) await actions[response.selection]();
}

async function showCompatibility(player) {
    const response = await new ActionFormData()
        .title(tr("kedu.guide.compat.title"))
        .header(tr("kedu.guide.compat.header"))
        .label(raw(
            tr("kedu.guide.compat.before_count"),
            ` ${COMPATIBLE_VANILLA_BLOCKS} `,
            tr("kedu.guide.compat.after_count"),
        ))
        .label(tr("kedu.guide.compat.body"))
        .divider()
        .button(tr("kedu.guide.button.complete_list"))
        .button(tr("kedu.guide.button.back"))
        .button(tr("kedu.guide.button.close"))
        .show(player);
    if (response.canceled) return;
    if (response.selection === 0) await showCompatibleBlocks(player, 0);
    else if (response.selection === 1) await showManualMain(player);
}

async function showManualMain(player) {
    const pages = [
        {
            title: "kedu.guide.camo.title",
            header: "kedu.guide.camo.header",
            body: "kedu.guide.camo.body",
        },
        {
            title: "kedu.guide.special.title",
            header: "kedu.guide.special.header",
            body: "kedu.guide.special.body",
        },
        {
            title: "kedu.guide.usage.title",
            header: "kedu.guide.usage.header",
            body: "kedu.guide.usage.body",
        },
        {
            title: "kedu.guide.scraper.title",
            header: "kedu.guide.scraper.header",
            body: "kedu.guide.scraper.body",
        },
        {
            title: "kedu.guide.crafting.title",
            header: "kedu.guide.crafting.header",
            body: "kedu.guide.crafting.body",
        },
    ];
    const response = await new ActionFormData()
        .title(tr("kedu.guide.main.title"))
        .header(tr("kedu.guide.main.header"))
        .label(tr("kedu.guide.main.body"))
        .divider()
        .button(tr("kedu.guide.button.camo"))
        .button(tr("kedu.guide.button.tools"))
        .button(tr("kedu.guide.button.special"))
        .button(tr("kedu.guide.button.usage"))
        .button(tr("kedu.guide.button.scraper"))
        .button(tr("kedu.guide.button.crafting"))
        .button(tr("kedu.guide.button.compatibility"))
        .button(tr("kedu.guide.button.close"))
        .show(player);
    if (response.canceled) return;
    if (response.selection === 1) {
        await showToolsGuide(player);
    } else if (response.selection === 6) {
        await showCompatibility(player);
    } else if (response.selection === 0) {
        await showManualPage(player, pages[0]);
    } else if (response.selection >= 2 && response.selection <= 5) {
        await showManualPage(player, pages[response.selection - 1]);
    }
}

function openManual(player) {
    if (manualOpenPlayers.has(player.id)) return;
    manualOpenPlayers.add(player.id);
    system.run(async () => {
        try {
            await showManualMain(player);
        } catch {}
        system.runTimeout(() => manualOpenPlayers.delete(player.id), 5);
    });
}

const HIGHLIGHT_OFFSETS = [
    [-0.0625, -0.0625, -0.0625], [1.0625, -0.0625, -0.0625],
    [-0.0625, -0.0625, 1.0625], [1.0625, -0.0625, 1.0625],
    [-0.0625, 1.0625, -0.0625], [1.0625, 1.0625, -0.0625],
    [-0.0625, 1.0625, 1.0625], [1.0625, 1.0625, 1.0625],
];

system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        try {
            const inventory = player.getComponent("minecraft:inventory")?.container;
            if (inventory?.getItem(player.selectedSlotIndex)?.typeId !== TOOL_ID) continue;
            const hit = player.getBlockFromViewDirection({
                maxDistance: 6,
                includeLiquidBlocks: false,
                includePassableBlocks: true,
            });
            const block = hit?.block;
            const camo = block && parseCamoBlock(block.typeId);
            if (!camo) continue;
            const textured = camo.bank > 0 || (block.permutation.getState(MATERIAL_STATE) ?? 0) > 0;
            if (!textured) continue;
            for (const offset of HIGHLIGHT_OFFSETS) {
                player.spawnParticle("minecraft:villager_happy", {
                    x: block.location.x + offset[0],
                    y: block.location.y + offset[1],
                    z: block.location.z + offset[2],
                });
            }
        } catch {}
    }
}, 5);

world.afterEvents.playerSpawn.subscribe(event => {
    system.runTimeout(() => giveManual(event.player), 20);
});

world.afterEvents.itemUse.subscribe(event => {
    if (event.itemStack.typeId === MANUAL_ID) openManual(event.source);
});

world.beforeEvents.playerInteractWithBlock.subscribe(event => {
    if (event.itemStack?.typeId === MANUAL_ID) {
        event.cancel = true;
        openManual(event.player);
        return;
    }
    const target = parseCamoBlock(event.block.typeId);
    if (target) {
        if (tryRemoveTexture(event, target)) return;
        if (tryApplyTexture(event, target)) return;
        if (tryMerge(event, target)) return;
        if (tryToggleTrapdoor(event, target)) return;
    }
    const held = parseCamoBlock(event.itemStack?.typeId ?? "");
    if (held) {
        if (tryDirectVerticalPlacement(event, held)) return;
        queuePlacement(event, held);
    }
});

world.afterEvents.playerPlaceBlock.subscribe(event => {
    const location = { ...event.block.location };
    const dimension = event.block.dimension;
    const camo = parseCamoBlock(event.block.typeId);
    if (camo) {
        const pending = pendingPlacements.get(event.player.id);
        if (pending && pending.typeId === event.block.typeId && pending.shape === camo.shape) {
            const { x, y, z } = event.block.location;
            const adjacent = x === pending.location.x && y === pending.location.y && z === pending.location.z;
            const replaced =
                x === pending.targetLocation.x && y === pending.targetLocation.y && z === pending.targetLocation.z;
            if (adjacent || replaced) {
                pendingPlacements.delete(event.player.id);
                event.block.setPermutation(event.block.permutation.withState(SHAPE_STATE, pending.value));
            }
        }
    }
    system.run(() => refreshConnections(dimension, location));
});

world.afterEvents.playerBreakBlock.subscribe(event => {
    const location = { ...event.block.location };
    const dimension = event.dimension;
    system.run(() => refreshConnections(dimension, location));
    if (event.player.getGameMode() === GameMode.Creative) return;
    const camo = parseCamoBlock(event.brokenBlockPermutation.type.id);
    if (!camo || (camo.shape !== "slab" && camo.shape !== "vertical_slab")) return;
    const fullValue = camo.shape === "slab" ? 1 : 4;
    if (event.brokenBlockPermutation.getState(SHAPE_STATE) !== fullValue) return;
    const { x, y, z } = event.block.location;
    event.dimension.spawnItem(new ItemStack(camo.baseId, 1), {
        x: x + 0.5,
        y: y + 0.5,
        z: z + 0.5,
    });
});

system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        try {
            const block = player.getBlockFromViewDirection({ maxDistance: 12, includePassableBlocks: true })?.block;
            const camo = block && parseCamoBlock(block.typeId);
            if (!camo) continue;
            const index = block.permutation.getState(MATERIAL_STATE) ?? 0;
            if (camo.index === undefined && (camo.bank !== 0 || index !== 0)) {
                const target = materialIdentifier(camo.baseId, camo.bank, index);
                try { block.setPermutation(BlockPermutation.resolve(target, block.permutation.getAllStates())); } catch {}
            }
            refreshConnections(block.dimension, block.location);
        } catch {}
    }
}, 1);
