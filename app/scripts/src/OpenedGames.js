/** @jsx React.DOM */
var OpenedGames = React.createClass({
  getInitialState: function() {
    return {messages: []};
  },

  mixins: [SetIntervalMixin],

//[TODO]Обрабатывать случай, когда нет игр
  render: function() {
    return <div>
      <pre>{
        this.state.messages.map(function (message) {
          href = settings.host + "/games/" + message.data.id + "/join";

          link = <a href={href} onClick={this.handleLinkClick}>
                   {message.data.game.level}{'\u00A0'}
                   {message.data.player.lang}
                   game</a>;
          player = <span>{message.data.player.nickname}</span>;

          game_id = <span>({message.data.id})</span>;

          return <div>{link}: {player}{game_id}</div>
        }, this)
      }</pre>
    </div>
  }
});

