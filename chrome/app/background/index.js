require("expose?$!expose?jQuery!jquery");
import _ from "lodash";
import "./bullet";
import {settings} from "../settings";

var messages = {"opened": [], "started": []};

const helpers = {
  deleteMessage: (type, msg) => {
    messages[type] = _.reject(messages[type], {game: msg.game});
  },

  clearMessages: () => {
    messages = {"opened": [], "started": []};
  },

  addMessage: (type, msg) => {
    messages[type] = messages[type].concat(msg);
  },

  setBadgeText: () => {
    // NOTE Можно не пересчитывать каждый раз полностью.
    const msgCount = messages["opened"].length;
    let text = "";
    if (msgCount > 0) {
      text += msgCount;
    }
    chrome.browserAction.setBadgeText({text: text});
  }
};

const handlers = {
  gameOpened: (msg) => {
    helpers.addMessage("opened", msg);
    window.messages = messages;
  },

  gameStarted: (msg) => {
    helpers.deleteMessage("opened", msg);
    helpers.addMessage("started", msg);
    window.messages = messages;
  },

  gameFinished: (msg) => {
    if (!helpers.deleteMessage("started", msg)) {
      helpers.deleteMessage("opened", msg);
    }
    window.messages = messages;
  }
};

$(() => {
  const currentSettings = __DEVELOPMENT__ ? settings.dev : settings.prod;
  const bullet = $.bullet(currentSettings.apiCall);
  bullet.onopen = () => {
    console.log("bullet: opened");
    helpers.clearMessages();
    helpers.setBadgeText();
  };

  bullet.ondisconnect = () => {
    console.log("bullet: disconnected");
    helpers.clearMessages();
    helpers.setBadgeText();
  };

  bullet.onclose = () => {
    console.log("bullet: closed");
    helpers.clearMessages();
    helpers.setBadgeText();
  };

  bullet.onmessage = (e) => {
    let response = $.parseJSON(e.data);
    handlers[response.handler](response.data);
    helpers.setBadgeText();
  };

  bullet.onheartbeat = () => {
    bullet.send("ping");
  };
});
