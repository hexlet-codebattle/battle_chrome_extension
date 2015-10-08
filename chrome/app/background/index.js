require("expose?$!expose?jQuery!jquery");
import _ from "lodash";
import "./bullet";
import SETTINGS from "../settings";

const state = {
  games: []
};

function syncGame(data) {
  const idx = _.findIndex(state.games, (item) => item.game.id === data.game.id);
  if (idx !== -1) {
    state.games[idx] = data;
  } else {
    state.games.unshift(data);
  }
}

function removeGame(data) {
  state.games = _.without(state.games, (item) => item.game.id === data.game.id);
}

function setBadgeText() {
  // NOTE Можно не пересчитывать каждый раз полностью.
  const msgCount = _.filter(state.games, (i) => i.game_process.state === "opened").length;
  let text = "";
  if (msgCount > 0) {
    text += msgCount;
  }
  chrome.browserAction.setBadgeText({ text: text });
}

const handlers = {
  syncGames(data) {
    state.games = data;
  },

  opened(data) {
    syncGame(data);
  },

  started(data) {
    syncGame(data);
  },

  finished(data) {
    removeGame(data);
  }
};

function initWS() {
  const bullet = $.bullet(SETTINGS.apiCall, {
    disableEventSource: true,
    disableXHRPolling: true
  });

  bullet.onopen = () => {
    console.log("bullet: opened");
    state.games = [];
    setBadgeText();
  };

  bullet.ondisconnect = () => {
    console.log("bullet: disconnected");
    state.games = [];
    setBadgeText();
  };

  bullet.onclose = () => {
    console.log("bullet: closed");
    state.games = [];
    setBadgeText();
  };

  bullet.onmessage = (e) => {
    let response = $.parseJSON(e.data);
    console.log("bullet: onmessage", response);
    handlers[response.handler](response.data);
    setBadgeText();
  };

  bullet.onheartbeat = () => {
    bullet.send("ping");
  };

  return bullet;
}

// $(() => {
//   var ws = initWS();
//   setInterval(() => {
//     ws.close();
//     ws = initWS();
//   }, 10000);
// });

// PUBLIC API
window.getGames = function(gameState) {
  return _.filter(state.games, (i) => i.game_process.state === gameState);
}
