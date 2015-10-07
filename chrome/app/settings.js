export const settings = {
  dev: {
    host: "http://ru.hexlet-staging.ru",
    apiCall: "ws://localhost:8080/ws/api/v1/games"
  },
  prod: {
    host: "http://ru.hexlet.io",
    apiCall: "wss://game.hexlet.io/ws/api/v1/games"
  }
};

export default (process.env.NODE_ENV === "production") ? settings.prod : settings.dev;
