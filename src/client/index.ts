import * as alt from 'alt-client';

alt.onRpc('view:characterSelection:show', () => {
    console.log('Showing character selection.');
    let view = new alt.WebView('http://resource/client/views/CharacterSelection/index.html');
    view.focus();
    setTimeout(() => {
        view.destroy();
    }, 5000);
});