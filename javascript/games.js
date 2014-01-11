var games = []
var games_handlers = {
  deleteGame: function(game) {
    games = _.reject(games, {data: {id: game.data.id}})
  },

  openGame: function(game) {
    games = games.concat(game);
  },

  startGame: function(game) {
    this.deleteGame(game);
  },

  finishGame: function(game) {
    this.deleteGame(game);
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
      game = $.parseJSON(e.data)
      games_handlers[game.handler](game)
      chrome.browserAction.setBadgeText({text: games.length + ""});
    };

    bullet.onheartbeat = function(){
      bullet.send('ping');
    }
  })();
});
