import * as alt from 'alt-server';

export default {
    name: 'spawn',
    description: 'Teleport a player to the spawnpoint or to the specified coordinates.',
    parameters: [{ name: 'x' }, { name: 'y' }, { name: 'z' }],
    execute: async (player, args) => {
        if (args.length === 0) player.spawn(0, 0, 72);
        else if (args.length === 3) {
            const [x, y, z] = args;
            player.spawn(parseFloat(x), parseFloat(y), parseFloat(z));
        }
    },
}