import Game from './game';

window.addEventListener('load', () => {
    const game = new Game();

    /*
    if (confirm("Start a new game?")) {
        game.start();
    } else {
        alert("Ok 😞");
    }
    */
    game.start();
});
