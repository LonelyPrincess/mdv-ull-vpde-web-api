# Web APIs

## Introduction

This project showcases the usage of a couple of native web APIs that can be relevant for developing games in this platform. The application is a **simple game where the player can make a character jump**, and it's developed by using plain HTML5, CSS3 and vanilla JavaScript.

### 🎮 Game controls

The following controls have be defined for this game:

| Action | | Button |
| --- | --- | --- |
| Enter fullscreen mode | ⌨️ | Enter |
| Exit fullscreen mode | ⌨️ | Escape |
| Jump | ⌨️ | Space |

### 🎦 Live preview

![Game preview](./res/screenshots/game-preview.gif)

## Development journal

In this section we'll cover the APIs that were integrated in the project, explaining how they add value to our game and some brief details on the implementation.

# 🖥️ Fullscreen API

The [fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API) does not only allow for the page to be rendered in fullscreen: it can also be used to display certain elements in that mode.

In this case, we used it to put all focus on the game area. **Upon entering the fullscreen mode, the player will only see the main game area**, including the character and the score. Other page elements such as the game instructions that are present at the top of the page will not be visible in this mode.

This is useful for the player to fully focus in the in-game elements, reducing the noise and avoiding having to scroll down the page to see what's relevant to them.

```javascript
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
```

# 💾 Web Storage API

[Web storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) is used to preserve the player's score in the current browser' session as well as the accumulated score across all sessions so far.

## Additional information

### 💡 Project specifications

This application should work in any modern browser (ex.: [Google Chrome](https://www.google.com/chrome/)) that supports the following:

- [CSS Animation](https://caniuse.com/css-animation)
- [Fullscreen API](https://caniuse.com/fullscreen)
- [Web Storage API](https://caniuse.com/namevalue-storage)

### ❔ How to run this project?

To run this application you'll need to run it on a local web server of your choice.

Although any other server would do, the following commands illustrate how to run it by using the [`live-server`](https://www.npmjs.com/package/live-server) package with [Node Package Manager](https://nodejs.org/en) installed in your system.

```bash
# Install local web server to use
$ npm install live-server -g

# Run application in local web server
$ live-server .
```

### 🔗 References

- [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)
- [Web storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [Animation end event](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationend_event)

### 🎨 Resources

- [EmoticonsText](https://www.emoticonstext.com/)