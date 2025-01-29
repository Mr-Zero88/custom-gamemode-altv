import * as alt from 'alt-server';

export default {
    name: 'character',
    description: 'Get information about a character',
    execute: async (player, args) => {
        player.setClothes(11, 15, 0, 0);
        player.setClothes(3, 15, 0, 0);
        player.setClothes(8, 15, 0, 0);
        player.setClothes(6, 1, 0, 0);
        (player as any).lastPosition = player.pos;
        player.spawn(402.5164, -1002.847, -99.2587);
        setTimeout(() => {
            player.emitRpc('view:characterSelection:show');
        }, 1000);
    },
}

alt.onRpc('view:characterSelection:done', (player) => {
    player.spawn((player as any).lastPosition);
});