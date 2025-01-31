import * as alt from 'alt-server';
import * as chat from 'alt:vchat';
import { Command } from '..';

export default {
    name: 'weapon',
    description: 'Give a weapon.',
    parameters: [{ name: 'model' }, { name: 'ammo' }],
    execute: async (player, args) => {
        if (args.length === 0)
            chat.send(player, `Usage: /weapon [model] [ammo]`);
        else {
            const [model, ammo] = args;
            player.giveWeapon(alt.hash(model), ammo ? parseInt(ammo) : 1000, false);
        }
    },
} as Command;