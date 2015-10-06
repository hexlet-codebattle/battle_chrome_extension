const settings = {
  dev: {
    host: "http://ru.hexlet-staging.ru",
    apiCall: "wss://game.hexlet-staging.ru/ws/api/v1/games"
  },
  prod: {
    host: "http://ru.hexlet.io",
    apiCall: "wss://game.hexlet.io/ws/api/v1/games"
  }
};


if (__DEVELOPMENT__) {
  module.exports = settings.dev;
} else {
  module.exports = settings.prod;
}
