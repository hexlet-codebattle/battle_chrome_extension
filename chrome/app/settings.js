export const settings = {
  dev: {
    host: "http://ru.hexlet-staging.ru",
    apiCall: "wss://game.hexlet.local/ws/api/v1/games",
    backgroundJsUrl: "https://localhost:3000/js/background.bundle.js",
    popupJsUrl: "https://localhost:3000/js/popup.bundle.js"
  },
  prod: {
    host: "http://ru.hexlet.io",
    apiCall: "wss://game.hexlet.io/ws/api/v1/games",
    backgroundJsUrl: "/js/background.bundle.js",
    popupJsUrl: "/js/popup.bundle.js",
  }
};

export default (process.env.NODE_ENV === "production") ? settings.prod : settings.dev;
