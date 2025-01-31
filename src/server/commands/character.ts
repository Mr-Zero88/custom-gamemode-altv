import * as alt from 'alt-server';
import { Command } from '..';

export default {
    name: 'character',
    description: 'Get information about a character',
    execute: async (player, args) => {
        player.setClothes(11, 15, 0, 0);
        player.setClothes(3, 15, 0, 0);
        player.setClothes(8, 15, 0, 0);
        player.setClothes(6, 1, 0, 0);
        (player as any).lastPosition = player.pos;
        player.rot = new alt.Vector3(0, 0, Math.PI);
        player.pos = new alt.Vector3(402.8175964355469, -996.2901000976562, -99.0146484375);
        setTimeout(() => {
            player.emitRpc('view:characterSelection:show');
        }, 100);
    },
} as Command;

alt.onRpc('view:characterSelection:done', (player) => {
    player.spawn((player as any).lastPosition);
});