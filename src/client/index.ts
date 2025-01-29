import * as alt from 'alt-client';

alt.onServer('view:characterSelection:show', () => {
    console.log('Showing character selection.');
    let view = new alt.WebView('http://resource/client/views/CharacterSelection/index.html');
    view.focus();
});