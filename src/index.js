const gameArea = document.getElementById('game-area');
const character = document.getElementById('character');

const [currentScoreInput] = document.getElementsByName('current-score');
const [accumulatedScoreInput] = document.getElementsByName('accumulated-score');

const storage = (() => {
  const getFromLocalStorage = key => {
    if (!!localStorage) {
      return localStorage.getItem(key);
    } else {
      return null;
    }
  };

  const getFromSessionStorage = key => {
    if (!!sessionStorage) {
      return sessionStorage.getItem(key);
    } else {
      return null;
    }
  };

  const setInLocalStorage = (key, value) => {
    if (!!localStorage) {
      return localStorage.setItem(key, value);
    }
  };

  const setInSessionStorage = (key, value) => {
    if (!!sessionStorage) {
      return sessionStorage.setItem(key, value);
    }
  };

  return {
    getFromLocalStorage,
    getFromSessionStorage,
    setInLocalStorage,
    setInSessionStorage,
  };
})();

const scoreManager = (() => {
  let currentScore = 0;
  let accumulatedScore = 0;

  const updateScoreUI = () => {
    currentScoreInput.value = currentScore;
    accumulatedScoreInput.value = accumulatedScore;
  };

  const initializeScore = () => {
    currentScore = storage.getFromSessionStorage('score') || 0;
    accumulatedScore = storage.getFromLocalStorage('score') || 0;

    updateScoreUI();
  };

  // Increment score and update storage with the new values
  const incrementScore = () => {
    currentScore++;
    storage.setInSessionStorage('score', currentScore);

    accumulatedScore++;
    storage.setInLocalStorage('score', accumulatedScore);

    updateScoreUI();
  };

  return {
    initializeScore,
    incrementScore,
  };
})();

scoreManager.initializeScore();

// Listen to animation end event to know when jump has ended
character.addEventListener("animationend", () => {
  console.log({ currentValue: currentScoreInput.value, nextValue: +currentScoreInput.value + 1 });
  scoreManager.incrementScore();
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
