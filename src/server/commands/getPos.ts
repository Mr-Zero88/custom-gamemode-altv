import * as alt from 'alt-server';
import * as chat from 'alt:vchat';

export default {
    name: 'getPos',
    description: 'Get the current position of the player.',
    execute: async (player, args) => {
        chat.send(player, `Position: ${player.pos.x}, ${player.pos.y}, ${player.pos.z}, Rotation: ${player.rot.x}, ${player.rot.y}, ${player.rot.z}`);
    },
}