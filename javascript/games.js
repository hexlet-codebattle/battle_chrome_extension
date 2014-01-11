var games = []

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
      if (game.handler != "openGame"){
        games = _.reject(games, {data: {id: game.data.id}})
      }else{
        games = games.concat(game);
      }
      chrome.browserAction.setBadgeText({text: games.length + ""});
    };

    bullet.onheartbeat = function(){
      bullet.send('ping');
    }
  })();
});
