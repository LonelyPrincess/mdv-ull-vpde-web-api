import ScoreManager from './scoreManager.js';

const gameArea = document.getElementById('game-area');
const character = document.getElementById('character');

ScoreManager.initializeScore();

// Listen to animation end event to know when jump has ended and increase the score
character.addEventListener("animationend", () => {
  ScoreManager.incrementScore();
  character.classList.remove('jumping');
});

// Listen to pressed keys to trigger the required actions
document.addEventListener('keydown', event => {
  switch (event.key) {
    case "Enter":
      console.log('Shall enter fullscreen mode...');
      if (!document.fullscreenElement) {
        gameArea.requestFullscreen();
      } else {
        console.debug('Game is already in fullscreen mode, so do nothing');
      }
      break;
    case "Spacebar":
    case " ":
      console.log('Shall trigger jump...');
      if (!character.classList.contains('jumping')) {
        character.classList.add('jumping');
      } else {
        console.warn('Cannot initiate new jump while in the air');
      }
      break;
    case "Escape":
      console.log('Shall exit fullscreen mode...');
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        console.debug('Game is not in fullscreen mode, so do nothing');
      }
      break;
    default:
      console.debug(`No action defined for key ${event.key}`);
  }
}, false);
