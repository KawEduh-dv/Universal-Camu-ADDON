const HIGHLIGHT_OFFSETS = [
    [-0.0625, -0.0625, -0.0625], [1.0625, -0.0625, -0.0625],
    [-0.0625, -0.0625, 1.0625], [1.0625, -0.0625, 1.0625],
    [-0.0625, 1.0625, -0.0625], [1.0625, 1.0625, -0.0625],
    [-0.0625, 1.0625, 1.0625], [1.0625, 1.0625, 1.0625],
];
const INDICATOR_PARTICLE_ID = "kedu:builder_tool_preview";

export function chat(player, key, values = []) {
    try {
        player.sendMessage({ translate: key, with: values.map(String) });
    } catch {}
}

function sound(player, id, pitch = 1) {
    try { player.playSound(id, { volume: 0.75, pitch }); } catch {}
}

export function selected(player, key, values = [], location = undefined) {
    chat(player, key, values);
    sound(player, "random.click", 1.15);
    if (location) highlightBlock(player, location);
}

export function success(player, key, values = [], location = undefined) {
    chat(player, key, values);
    successEffect(player, location);
}

export function selectedEffect(player, location = undefined) {
    sound(player, "random.click", 1.15);
    if (location) highlightBlock(player, location);
}

export function successEffect(player, location = undefined) {
    sound(player, "random.orb", 1.05);
    if (location) highlightBlock(player, location);
}

export function failure(player, key, values = []) {
    chat(player, key, values);
    sound(player, "note.bass", 0.75);
}

export function particle(player, location) {
    spawnIndicatorParticle(player, {
        x: location.x + 0.5, y: location.y + 0.75, z: location.z + 0.5,
    });
}

export function spawnIndicatorParticle(player, location) {
    try {
        player.spawnParticle(INDICATOR_PARTICLE_ID, location);
    } catch {}
}

export function highlightBlock(player, location) {
    for (const offset of HIGHLIGHT_OFFSETS) {
        spawnIndicatorParticle(player, {
            x: location.x + offset[0],
            y: location.y + offset[1],
            z: location.z + offset[2],
        });
    }
}
