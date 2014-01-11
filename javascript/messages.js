var messages = []

var helpers = {
  deleteMessage: function(msg) {
    messages = _.reject(messages, {data: {id: msg.data.id}})
  },

  setBadgeText: function() {
    //NOTE Можно не пересчитывать каждый раз полностью.
    var msg_count = messages.length;
    var text = "";
    if (msg_count > 0){
      text += msg_count;
    }
    chrome.browserAction.setBadgeText({text: text});
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
    };

    bullet.ondisconnect = function(){
      console.log('bullet: disconnected');
    };

    bullet.onclose = function(){
      console.log('bullet: closed');
    };

    bullet.onmessage = function(e){
      msg = $.parseJSON(e.data);
      handlers[msg.handler](msg);
      helpers.setBadgeText();
    };

    bullet.onheartbeat = function(){
      bullet.send('ping');
    }
  })();
});
