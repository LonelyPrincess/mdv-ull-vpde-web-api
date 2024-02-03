console.log('Hello! :3');

const elem = document.getElementById('game-area');
const character = document.getElementById('character');

// Listen to pressed keys
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case "Enter":
      console.log('Shall enter fullscreen mode...');
      break;
    case "Spacebar":
    case " ":
      console.log('Shall trigger jump...');
      break;
    case "Escape":
      console.log('Shall exit fullscreen mode...');
      break;
    default:
      console.debug(`No action defined for key ${e.key}`);
  }
}, false);

const toggleFullscreenMode = elem => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

elem.addEventListener('click', event => {
  console.log(document.fullscreenElement);
  console.log('Shall enter fullscreen for elem', elem);
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  }

  event.preventDefault();
});

/*
document.addEventListener('click', function (event) {

	// If the clicked element doesn't have the right selector, bail
	if (!event.target.matches('.click-me')) return;

	// Don't follow the link
	event.preventDefault();

	// Log the clicked element in the console
	console.log(event.target);

}, false);

const elem = document.getElementById("myvideo");
if (elem.requestFullscreen) {
  elem.requestFullscreen();
}*/