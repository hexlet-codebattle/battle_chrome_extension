var messages = []

var helpers = {
  deleteMessage: function(msg) {
    messages = _.reject(messages, {data: {id: msg.data.id}})
  }
}

var handlers = {

  openGame: function(msg) {
    messages = messages.concat(msg);
  },

  startGame: function(msg) {
    this.helpers.deleteMessage(msg);
  },

  finishGame: function(msg) {
    helpers.deleteMessage(msg);
  }

}

$(function(){
  (function establish_connection(){
    var bullet = $.bullet('ws://wddx.ru/ws/games');
    bullet.onopen = function(){
      console.log('bullet: opened');
      chrome.browserAction.setBadgeText({text: "0"});
    };

    bullet.ondisconnect = function(){
      console.log('bullet: disconnected');
      chrome.browserAction.setBadgeText({text: "-"});
    };

    bullet.onclose = function(){
      console.log('bullet: closed');
      chrome.browserAction.setBadgeText({text: "-"});
    };

    bullet.onmessage = function(e){
      msg = $.parseJSON(e.data)
      handlers[msg.handler](msg)
      chrome.browserAction.setBadgeText({text: messages.length + ""});
    };

    bullet.onheartbeat = function(){
      bullet.send('ping');
    }
  })();
});
