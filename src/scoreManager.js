import storage from './storage.js';

const [currentScoreInput] = document.getElementsByName('current-score');
const [accumulatedScoreInput] = document.getElementsByName('accumulated-score');

const ScoreManager = (() => {
  let currentScore = 0;
  let accumulatedScore = 0;

  // Update UI with the current scores
  const renderScores = () => {
    currentScoreInput.value = currentScore;
    accumulatedScoreInput.value = accumulatedScore;
  };

  // Fetch initial values for scores from the web storage
  const initializeScore = () => {
    currentScore = storage.getFromSessionStorage('score') || 0;
    accumulatedScore = storage.getFromLocalStorage('score') || 0;
    console.debug('Initial scores: ', { currentScore, accumulatedScore });

    renderScores();
  };

  // Increment score and update storage with the new values
  const incrementScore = () => {
    currentScore++;
    storage.setInSessionStorage('score', currentScore);

    accumulatedScore++;
    storage.setInLocalStorage('score', accumulatedScore);

    console.debug('Updated scores: ', { currentScore, accumulatedScore });
    renderScores();
  };

  return {
    initializeScore,
    incrementScore,
  };
})();

export default ScoreManager;