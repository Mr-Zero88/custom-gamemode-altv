import * as alt from 'alt-server';
import * as chat from 'vchat';

const spawnCommand = {
    name: 'spawn',
    description: 'Teleport a player to the spawnpoint or to the specified coordinates.',
    parameters: [{ name: 'x' }, { name: 'y' }, { name: 'z' }],
};

const vehicleCommand = {
    name: 'vehicle',
    description: 'Spawn a vehicle.',
    parameters: [{ name: 'model' }],
};

const reloadCommand = {
    name: 'reload',
    description: 'Reload the server scripts.',
    parameters: [{ name: 'addon' }],
};

const characterCommand = {
    name: 'character',
    description: 'Change the player character.'
};

// /spawn [x] [y] [z]
chat.addSuggetionAll(spawnCommand);
chat.registerCmd(spawnCommand.name, (player, args) => {
    if (args.length === 0) player.spawn(0, 0, 72);
    else if (args.length === 3) {
        const [x, y, z] = args;
        player.spawn(parseFloat(x), parseFloat(y), parseFloat(z));
    }
});

// /vehicle [model]
chat.addSuggetionAll(vehicleCommand);
chat.registerCmd(vehicleCommand.name, (player, args) => {
    if (args.length === 0) chat.send(player, `Usage: /${vehicleCommand.name} [model]`);
    else {
        const [model] = args;
        const vehicle = new alt.Vehicle(model, player.pos.x, player.pos.y, player.pos.z, 0, 0, 0);
    }
});

// /reload [addon]
chat.addSuggetionAll(reloadCommand);
chat.registerCmd(reloadCommand.name, (player, args) => {
    if (args.length === 0) {
        alt.getAllResources().forEach((resource) => {
            alt.restartResource(resource.name);
        });
    } else {
        const [addon] = args;
        alt.restartResource(addon);
    }
});

// /character
chat.addSuggetionAll(characterCommand);
chat.registerCmd(characterCommand.name, (player, args) => {
    player.emitRpc('view:characterSelection:show');
});

alt.on('playerConnect', (player) => {
    // Sends a message to the logged-in player
    chat.send(player, `Welcome to the server ${player.name}`, 1);
    // Sends a message to all players as well as the one who joined
    chat.broadcast(`Player ${player.name} has joined the server`, 1);
});

alt.on('playerDisconnect', (player) => {
    chat.broadcast(`Player ${player.name} has left the server`, 1);
});
