var games = []
$(function(){
  function establish_connection(){
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
      games = games.concat(e.data);
      chrome.browserAction.setBadgeText({text: games.length + ""});
      console.log(games);
    };
    bullet.onheartbeat = function(){
        bullet.send('ping');
    }
  }
  establish_connection.call();
});
