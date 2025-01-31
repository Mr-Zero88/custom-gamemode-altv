import * as alt from 'alt-server';
import * as chat from 'alt:vchat';
import { Command } from '..';

export default {
    name: 'noclip',
    description: 'Toggle noclip.',
    parameters: [],
    execute: async (player, args) => {
        if (player.getSyncedMeta('noclip')) {
            player.setSyncedMeta('noclip', false);
            player.emit('noclip:stop');
        } else {
            player.setSyncedMeta('noclip', true);
            player.emit('noclip:start');
        }
    },
} as Command;