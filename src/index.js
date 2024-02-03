console.log('Hello! :3');

const elem = document.getElementById('game-area');

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