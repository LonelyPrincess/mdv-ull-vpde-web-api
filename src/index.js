import ScoreManager from './scoreManager.js';

const gameArea = document.getElementById('game-area');
const character = document.getElementById('character');

// Fetch initial scores from storage and display them in the UI
ScoreManager.initializeScore();

// Execute game in fullscreen mode
const enterFullscreenMode = () => {
  if (!document.fullscreenElement) {
    console.log('Displaying game area in fullscreen...');
    gameArea.requestFullscreen();
  } else {
    console.debug('Game is already in fullscreen mode, so do nothing');
  }
};

// Exit fullscreen mode
const exitFullscreenMode = () => {
  if (document.fullscreenElement) {
    console.log('Leaving fullscreen mode...');
    document.exitFullscreen();
  } else {
    console.debug('Game is not in fullscreen mode, so do nothing');
  }
};

// Listen to animation end event to know when jump has ended and increase the score
character.addEventListener("animationend", () => {
  ScoreManager.incrementScore();
  character.classList.remove('jumping');
});

// Listen to pressed keys to trigger the required actions
document.addEventListener('keydown', event => {
  switch (event.key) {
    case "Enter":
      console.debug('Shall enter fullscreen mode...');
      enterFullscreenMode();
      break;
    case "Spacebar":
    case " ":
      console.debug('Shall trigger jump...');
      if (!character.classList.contains('jumping')) {
        character.classList.add('jumping');
      } else {
        console.debug('Cannot initiate new jump while in the air');
      }
      break;
    case "Escape":
      console.debug('Shall exit fullscreen mode...');
      exitFullscreenMode();
      break;
    default:
      console.debug(`No action defined for key ${event.key}`);
  }
}, false);
