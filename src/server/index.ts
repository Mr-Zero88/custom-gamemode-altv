import * as alt from 'alt-server';
import * as chat from 'alt:vchat';
import spawn from './commands/spawn';
import vehicle from './commands/vehicle';
import reload from './commands/reload';
import character from './commands/character';
import getPos from './commands/getPos';

interface Command extends chat.CommandSuggestion {
    execute: chat.CommandHandler
}

const commands: Array<Command> = [spawn, vehicle, reload, character, getPos];

commands.forEach((command) => {
    chat.registerCmd(command.name, command.execute);
});

alt.on('playerConnect', (player) => {
    // Sends a message to the logged-in player
    chat.send(player, `Welcome to the server ${player.name}`, 1);
    // Sends a message to all players as well as the one who joined
    chat.broadcast(`Player ${player.name} has joined the server`, 1);
    // Remove all suggestions for the player
    chat.removeSuggestions(player);
    // Add all suggestions for the player
    commands.forEach((command) => {
        chat.addSuggestion(player, { name: command.name, description: command.description, parameters: command.parameters });
    });
});

alt.on('resourceStart', () => {
    alt.Player.all.forEach((player) => {
        // Remove all suggestions for the player
        chat.removeSuggestions(player);
        // Add all suggestions for the player
        commands.forEach((command) => {
            chat.addSuggestion(player, { name: command.name, description: command.description, parameters: command.parameters });
        });
    });
});

alt.on('playerDisconnect', (player) => {
    chat.broadcast(`Player ${player.name} has left the server`, 1);
});
