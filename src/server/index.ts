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
chat.registerCmd(spawnCommand.name, (player, args) => {
    if (args.length === 0) player.spawn(0, 0, 72);
    else if (args.length === 3) {
        const [x, y, z] = args;
        player.spawn(parseFloat(x), parseFloat(y), parseFloat(z));
    }
});

// /vehicle [model]
chat.registerCmd(vehicleCommand.name, (player, args) => {
    if (args.length === 0) chat.send(player, `Usage: /${vehicleCommand.name} [model]`);
    else {
        const [model] = args;
        const vehicle = new alt.Vehicle(model, player.pos, player.rot);
        player.emitRpc('vehicle:enter', vehicle.id, -1);
    }
});

// /reload [addon]
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
chat.registerCmd(characterCommand.name, (player, args) => {
    player.setClothes(11, 15, 0, 0);
    player.setClothes(3, 15, 0, 0);
    player.setClothes(8, 15, 0, 0);
    player.setClothes(6, 1, 0, 0);
    (player as any).lastPosition = player.pos;
    player.spawn(402.5164, -1002.847, -99.2587);
    player.emitRpc('view:characterSelection:show');
});

alt.onRpc('view:characterSelection:done', (player) => {
    player.spawn((player as any).lastPosition);
});

alt.on('playerConnect', (player) => {
    // Sends a message to the logged-in player
    chat.send(player, `Welcome to the server ${player.name}`, 1);
    // Sends a message to all players as well as the one who joined
    chat.broadcast(`Player ${player.name} has joined the server`, 1);
    chat.removeSuggestions(player);
    chat.addSuggestion(player, spawnCommand);
    chat.addSuggestion(player, vehicleCommand);
    chat.addSuggestion(player, reloadCommand);
    chat.addSuggestion(player, characterCommand);
});

alt.on('playerDisconnect', (player) => {
    chat.broadcast(`Player ${player.name} has left the server`, 1);
});
