import Game from './game';

window.addEventListener('load', () => {
    console.group('Game prompts');
    const game = new Game();

    /* if (confirm("Start a new game?")) {
        game.start();
    } else {
        alert("Ok 😞");
    } */
    console.groupEnd();

    console.log(game);
    game.start();
});
