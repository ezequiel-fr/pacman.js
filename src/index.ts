import Game from './game';

declare global {
    interface Window {
        game: Game,
    }
}

window.addEventListener('load', async () => {
    const game = new Game();

    // Play/pause button
    const gameBtn = document.getElementById('game-btn') as HTMLButtonElement;
    const updateButton = () => gameBtn.innerHTML = window.game.STATE ? "Resume" : "Pause";

    game.on('pause', updateButton);
    game.on('play', updateButton);

    gameBtn.addEventListener('click', () => {
        window.game[window.game.STATE ? 'pause' : 'resume']();
    });

    // Log game instance
    console.log(game);

    // Start the game
    await game.start();
    gameBtn.innerHTML = "Pause";
});
