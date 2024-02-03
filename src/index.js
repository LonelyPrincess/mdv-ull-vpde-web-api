console.log('Hello! :3');

const gameArea = document.getElementById('game-area');
const character = document.getElementById('character');

const [currentScoreInput] = document.getElementsByName('current-score');
const [accumulatedScoreInput] = document.getElementsByName('accumulated-score');

// Listen to animation end event to know when jump has ended
character.addEventListener("animationend", () => {
  console.log({ currentValue: currentScoreInput.value, nextValue: +currentScoreInput.value + 1 });
  currentScoreInput.value = +currentScoreInput.value + 1;
  character.classList.remove('jumping');
});

// Listen to pressed keys
document.addEventListener('keydown', (e) => {
  switch (e.key) {
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
      console.debug(`No action defined for key ${e.key}`);
  }
}, false);
