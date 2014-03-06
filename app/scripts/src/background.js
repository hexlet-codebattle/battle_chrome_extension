//FIXME switch settings for development or production
var settings = {
  host: "http://wddx.ru",
  api_call: "ws://wddx.ru/ws/api/v1/games"
};

var messages = {"opened": [], "started": []}

var helpers = {
  deleteMessage: function(type, msg) {
    messages[type] = _.reject(messages[type], {id: msg.id})
  },

  clearMessages: function() {
    messages = {"opened": [], "started": []}
  },

  addMessage: function(type, msg) {
    messages[type] = messages[type].concat(msg);
  },

  setBadgeText: function() {
    //NOTE Можно не пересчитывать каждый раз полностью.
    var msg_count = messages["opened"].length + messages["started"].length;
    var text = "";
    if (msg_count > 0){
      text += msg_count;
    }
    chrome.browserAction.setBadgeText({text: text});
  }
}

var handlers = {

  openGame: function(msg) {
    helpers.addMessage("opened", msg);
  },

  startGame: function(msg) {
    helpers.deleteMessage("opened", msg);
    helpers.addMessage("started", msg);
  },

  finishGame: function(msg) {
    if (!helpers.deleteMessage("started", msg)) {
      helpers.deleteMessage("opened", msg);
    }
  }

}

$(function(){
  (function establish_connection(){
    var bullet = $.bullet(settings.api_call);
    bullet.onopen = function(){
      console.log('bullet: opened');
      helpers.clearMessages();
      helpers.setBadgeText();
    };

    bullet.ondisconnect = function(){
      console.log('bullet: disconnected');
      helpers.clearMessages();
      helpers.setBadgeText();
    };

    bullet.onclose = function(){
      console.log('bullet: closed');
      helpers.clearMessages();
      helpers.setBadgeText();
    };

    bullet.onmessage = function(e){
      response = $.parseJSON(e.data);
      handlers[response.handler](response.data);
      helpers.setBadgeText();
    };

    bullet.onheartbeat = function(){
      bullet.send('ping');
    }
  })();
});
