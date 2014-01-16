/** @jsx React.DOM */

var settings = chrome.extension.getBackgroundPage().settings;

var BattleGame = React.createClass({displayName: 'BattleGame',

   handleLinkClick: function(e) {
     e.preventDefault();
     chrome.tabs.create({url: e.target.href});
   },

  render: function() {
    href = settings.host + "/games/247/join"
    return (
      React.DOM.div(null, 
        React.DOM.a( {href:href, onClick:this.handleLinkClick}, "Join"),
        React.DOM.span(null,  " to ", this.props.game.player.nickname)
      )
    )
  }
});
