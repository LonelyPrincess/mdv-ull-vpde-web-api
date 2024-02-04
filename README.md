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

### 🖥️ Fullscreen API

The [fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API) does not only allow for the page to be rendered in fullscreen: it can also be used to display certain elements in that mode.

In this case, we used it to put all focus on the game area. **Upon entering the fullscreen mode, the player will only see the main game area**, including the character and the score. Other page elements such as the game instructions that are present at the top of the page will not be visible in this mode.

This is useful for the player to fully focus in the in-game elements, reducing the noise and avoiding having to scroll down the page to see what's relevant to them.

#### Implementation notes

The following function is used to enter the fullscreen mode, and will be called whenever the player presses the _"Enter"_ key:

```javascript
const enterFullscreenMode = () => {
  if (!document.fullscreenElement) {
    console.log('Displaying game area in fullscreen...');
    gameArea.requestFullscreen();
  } else {
    console.debug('Game is already in fullscreen mode, so do nothing');
  }
};
```

`gameArea` is the element where we want the fullscreen content to focus on, and `requestFullscreen` is the API method that makes it possible to achieve the desired result. Before calling this, we first check whether we're already in fullscreen mode by checking the value of `document.fullscreenElement`: that variable being set means that fullscreen mode is currently active, so we'll perform no action in this case.

Method to leave the fullscreen mode is quite similar, as seen in the code below:

```javascript
const exitFullscreenMode = () => {
  if (document.fullscreenElement) {
    console.log('Leaving fullscreen mode...');
    document.exitFullscreen();
  } else {
    console.debug('Game is not in fullscreen mode, so do nothing');
  }
};
```

As we can see here, the API provides a method `exitFullscreen` that can be used to return to the default window mode. We'll call this method only in case we identify the fullscreen mode is currently enabled.

### 💾 Web Storage API

[Web storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) allows applications to store certain data in the browser, therefore making it persistant and not fade away if the user reloads the page.

This API provides two different types of storage we can use depending on our needs, and in this demo we've used them both to better illustrate the difference. More specifically, we've used them to store the score of the user, keeping track of the jumps they've managed to make both in the current session and during all time they've used the game.

Scores for the current session are being kept in the **session storage**, where we can store data that will persist during the length of a session. This means **the data will remain there for as long as the browser remains open, but will fade when it's closed**. Because of this, if we reopen the browser and load the game afterwards, we'll notice that the current session score is reset to zero.

On the other hand, **local storage** serves as a more **persistant storage**. Here we'll be storing the total score of the user. If we close the browser and open it again, total we had before will remain untouched.

This API, therefore, can be pretty useful to save certain information just like user preferences (ex.: language) or just keep records of the highest scored achieved in a specific browser.

Of course, this is not a good solution for games in which we really need for data to persist forever, as there are several limitations. First, web storage serves as a collection of key-value pairs which can only be used to keep pretty basic data that can be stored as strings. Second, it offers a limited amount of space, so we cannot store data which is too large in size.

Lastly, and maybe the most important point, the data is tightly coupled to the browser instance in which the game has run. If the player decides to clear all their cached data, reinstall the browser or try out the game on a different PC, they will NOT be able to access their old information anymore. Data lives on that specific browser instance, and will only persist as long as the browser in use remains the same.

Although there's also the [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) which could be used as a replacement for the web storage API when we need to store larger chunks of data and support more complex data types, the last forementioned limitation also applies here.

This simple storage API is enough for this use case, but for larger games in which players wouldn't like their data to be lost under any circumnstances, we cannot rely on none of these APIs. Instead, we'd need to depend on a real database in our game server to ensure users are able to retrieve their data even if they switch computers or try out a different web browser.

#### Implementation notes

Code to manage the score counters can be found in the [`scoreManager.js`](./src/scoreManager.js) file, whereas [`storage.js`](./src/storage.js) contains the code that directly interacts with the web storage API.

The later is quite simple, as it just provides methods to write and read variables from both the local and session storages. Part of these methods include a check to validate that these storages are available, to avoid errors in case the browser in which we run the game does not support this feature.

As for the `ScoreManager` namespace, this will internally keep track of the current scores and provide methods to update / read the values in the storage, as well as refresh the counters in the UI based on these values.

When the game starts, the `initializeScore` method is called to fetch the scores previously set in the storage. Code for this method can be seen below:

```javascript
const initializeScore = () => {
  currentScore = storage.getFromSessionStorage('score') || 0;
  accumulatedScore = storage.getFromLocalStorage('score') || 0;

  console.debug('Initial scores: ', { currentScore, accumulatedScore });
  renderScores();
};
```

The `getFromSessionStorage` and `getFromLocalStorage` methods internally call `sessionStorage.getItem` and `localStorage.getItem` respectively to obtain this data. If the storage does not yet contain a score (in which case, `getItem` will return `null`), or if the web storage API is not supported, then we initialize the counters to `0` by default.

As for when these values are updated, this currently happens within the `incrementScore` method which is called in the `animationend` event handler of the character. End of this animation means that the character has landed and that therefore a jump has been completed, so it's at this time that we'll increase both counters in one unit.

```javascript
const incrementScore = () => {
  currentScore++;
  storage.setInSessionStorage('score', currentScore);

  accumulatedScore++;
  storage.setInLocalStorage('score', accumulatedScore);

  console.debug('Updated scores: ', { currentScore, accumulatedScore });
  renderScores();
};
```

Same as before, `setInSessionStorage` and `setInLocalStorage` will respectively call `sessionStorage.setItem` and `localStorage.setItem` to write the updated score in the web storage. With this we were able to achieve a functional way to preserve the user records, so that they're not lost as soon as the user leaves the page.

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

- [Google Fonts](https://fonts.google.com/)
- [EmoticonsText](https://www.emoticonstext.com/)