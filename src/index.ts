import Game from './game';

declare global {
    interface Window {
        game: Game,
    }
}

window.addEventListener('load', () => {
    const game = new Game();

    // Button
    const gameBtn = document.getElementById('game-btn') as HTMLButtonElement;
    gameBtn.innerHTML = "Pause";

    function updateButton() {
        gameBtn.innerHTML = window.game.STATE ? "Pause" : "Resume";
        window.game[window.game.STATE ? 'pause' : 'resume']();
    }

    gameBtn.addEventListener('click', updateButton);

    console.log(game);
    game.start();
});
