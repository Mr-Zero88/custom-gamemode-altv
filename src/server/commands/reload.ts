import * as alt from 'alt-server';
import * as chat from 'alt:vchat';

export default {
    name: 'reload',
    description: 'Reload the server scripts.',
    parameters: [{ name: 'addon' }],
    execute: async (player, args) => {
        if (args.length === 0) {
            chat.send(player, `Usage: /reload [addon]`);
        } else {
            const [addon] = args;
            chat.send(player, `Reloading ${addon}...`);
            alt.restartResource(addon);
            chat.send(player, `Reloaded ${addon}!`);
        }
    },
}