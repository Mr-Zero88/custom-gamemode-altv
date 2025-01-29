import * as alt from 'alt-client';
import * as native from 'natives';

alt.onRpc('view:characterSelection:show', () => {
    console.log('Showing character selection.');

    let view = new alt.WebView('http://resource/client/views/CharacterSelection/index.html');
    view.focus();
    alt.showCursor(true);
    alt.toggleGameControls(false);
    alt.toggleVoiceControls(false);
    alt.toggleRmlControls(false);

    let player = alt.Player.local;
    let height = 0.2;
    let angle = 2.6;
    let cameraOffset = getCameraOffset(player.pos, player.rot.z, angle, height);
    let bodyCam = native.createCamWithParams('DEFAULT_SCRIPTED_CAMERA', cameraOffset.x, cameraOffset.y, cameraOffset.z, 0, 0, 0, 50, true, 2);
    native.pointCamAtCoord(bodyCam, player.pos.x, player.pos.y, player.pos.z + height);
    native.setCamActive(bodyCam, true);
    native.renderScriptCams(true, false, 0, true, false, 0);
    native.setCamAffectsAiming(bodyCam, false);

    setTimeout(() => {
        view.destroy();
        alt.showCursor(false);
        alt.toggleGameControls(true);
        alt.toggleVoiceControls(true);
        alt.toggleRmlControls(true);
        native.setCamActive(bodyCam, false);
        native.renderScriptCams(false, false, 0, true, false, 0);
        native.destroyCam(bodyCam, true);
        alt.emitRpc('view:characterSelection:done');
    }, 10000);
});

alt.onRpc('vehicle:enter', (vehicleId, seat) => {
    if (!native.isVehicleSeatFree(vehicleId, seat, false)) return false;
    native.setPedIntoVehicle(alt.Player.local.scriptID, vehicleId, seat);
    return true;
});

function getCameraOffset(position: alt.Vector3, angle: number, distance: number, height: number): alt.Vector3 {
    const angleRadians = angle * (Math.PI / 180);
    const x = position.x + distance * Math.sin(angleRadians);
    const y = position.y + distance * Math.cos(angleRadians);
    return new alt.Vector3(x, y, position.z + height);
}