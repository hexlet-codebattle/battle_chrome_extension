/** @jsx React.DOM */
var StartedGames = React.createClass({
  getInitialState: function() {
    return {messages: []};
  },

  mixins: [SetIntervalMixin],

  getGames: function(){
    return this.state.messages.map(function (message) {
      //[FIXME] получать ссылку на игру с сервера
      href = settings.host + "/games/" + message.data.id;
      first_player = _.first(message.data.players);
      second_player = _.last(message.data.players);

      players = <a href={href} onClick={this.handleLinkClick} className="game_link">
        {first_player.nickname} vs
        {second_player.nickname}
      </a>;

      langs = <span>
        {first_player.lang}/{second_player.lang}
      </span>

      return <div>{langs} : {players}</div>
    }, this);
  },

//[TODO]Обрабатывать случай, когда нет игр
  render: function() {
    return <div>{this.state.messages > 0 ? this.getGames() : "No started games"}</div>
  }
});

