const WebStorage = (() => {
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

export default WebStorage;