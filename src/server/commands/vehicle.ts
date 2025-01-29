import * as alt from 'alt-server';
import * as chat from 'vchat';

export default {
    name: 'vehicle',
    description: 'Spawn a vehicle.',
    parameters: [{ name: 'model' }],
    execute: async (player, args) => {
        if (args.length === 0)
            chat.send(player, `Usage: /vehicle [model]`);
        else {
            const [model] = args;
            const vehicle = new alt.Vehicle(model, player.pos, player.rot);
            setTimeout(() => {
                player.emitRpc('vehicle:enter', vehicle.id, -1);
            }, 500);
        }
    },
}