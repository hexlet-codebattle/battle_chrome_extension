/** @jsx React.DOM */

var settings = chrome.extension.getBackgroundPage().settings;

var BattleGame = React.createClass({

   handleLinkClick: function(e) {
     e.preventDefault();
     chrome.tabs.create({url: e.target.href});
   },

  render: function() {
    href = settings.host + "/games/" + this.props.game.id + "/join";
    return (
      <div>
        <a href={href} onClick={this.handleLinkClick}>Join</a>
        <span> to {this.props.game.player.nickname}</span>
      </div>
    )
  }
});
