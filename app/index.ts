window.addEventListener('load', () => {
    // WebSocket sync
    require('./server-sync');
    // Import the game
    require('./game');
});
