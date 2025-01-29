import * as alt from 'alt-server';
import * as chat from 'vchat';

export default {
    name: 'reload',
    description: 'Reload the server scripts.',
    parameters: [{ name: 'addon' }],
    execute: async (player, args) => {
        if (args.length === 0) {
            // alt.getAllResources().forEach((resource) => {
            //     alt.restartResource(resource.name);
            // });
            chat.send(player, `Usage: /reload [addon]`);
        } else {
            const [addon] = args;
            alt.restartResource(addon);
        }
    },
}