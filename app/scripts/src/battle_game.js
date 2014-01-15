/** @jsx React.DOM */

var settings = chrome.extension.getBackgroundPage().settings;

var BattleGame = React.createClass({
  render: function() {
    href = settings.host + "/games/247/join"
    return (
      <div>
        <a href={href}>Join</a>
        <span> to {this.props.game.player.nickname}</span>
      </div>
    )
  }
});
