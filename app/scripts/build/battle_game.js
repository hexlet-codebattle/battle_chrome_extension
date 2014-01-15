/** @jsx React.DOM */

var settings = chrome.extension.getBackgroundPage().settings;

var BattleGame = React.createClass({displayName: 'BattleGame',
  render: function() {
    href = settings.host + "/games/247/join"
    return (
      React.DOM.div(null, 
        React.DOM.a( {href:href}, "Join"),
        React.DOM.span(null,  " to ", this.props.game.player.nickname)
      )
    )
  }
});
