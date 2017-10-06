require("expose-loader?$!expose-loader?jQuery!jquery");
import _ from "lodash";
import "./bullet";
import SETTINGS from "../settings";

const ConnectionStates = {
  DISCONNECTED: "disconnected",
  CONNECTED: "connected"
};

const state = {
  games: [],
  connectionState: ConnectionStates.DISCONNECTED
};

window.state = state;

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

    state.connectionState = ConnectionStates.CONNECTED;
    state.games = [];
    setBadgeText();

    const json = JSON.stringify({event: "subscribe", data: {}});
    bullet.send(json);
  };

  bullet.ondisconnect = () => {
    console.log("bullet: disconnected");
    state.connectionState = ConnectionStates.DISCONNECTED;
    state.games = [];
    setBadgeText();
  };

  bullet.onclose = () => {
    console.log("bullet: closed");
    state.connectionState = ConnectionStates.DISCONNECTED;
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

$(() => {
  window.ws = initWS();

  setInterval(() => {
    if (state.connectionState === ConnectionStates.CONNECTED) {
      const json = JSON.stringify({event: "sync_games", data: {}});
      ws.send(json);
    }
  }, 15000);
});

// PUBLIC API
window.getGames = function(gameState) {
  return _.filter(state.games, (i) => i.game_process.state === gameState);
}
