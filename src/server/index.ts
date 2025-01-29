import * as alt from 'alt-server';
import * as chat from 'vchat';
import spawn from './commands/spawn';
import vehicle from './commands/vehicle';
import reload from './commands/reload';
import character from './commands/character';

chat.registerCmd(spawn.name, spawn.execute);
chat.registerCmd(vehicle.name, vehicle.execute);
chat.registerCmd(reload.name, reload.execute);
chat.registerCmd(character.name, character.execute);

alt.on('playerConnect', (player) => {
    // Sends a message to the logged-in player
    chat.send(player, `Welcome to the server ${player.name}`, 1);
    // Sends a message to all players as well as the one who joined
    chat.broadcast(`Player ${player.name} has joined the server`, 1);
    chat.removeSuggestions(player);
    chat.addSuggestion(player, spawn);
    chat.addSuggestion(player, vehicle);
    chat.addSuggestion(player, reload);
    chat.addSuggestion(player, character);
});

alt.on('playerDisconnect', (player) => {
    chat.broadcast(`Player ${player.name} has left the server`, 1);
});
