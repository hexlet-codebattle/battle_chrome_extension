/** @jsx React.DOM */
var StartedGames = React.createClass({
  getInitialState: function() {
    return {messages: []};
  },

  mixins: [SetIntervalMixin],

//[TODO]Обрабатывать случай, когда нет игр
  render: function() {
    return <div>
      <pre>{
        this.state.messages.map(function (message) {
          //[FIXME] получать ссылку на игру с сервера
          href = settings.host + "/games/" + message.data.id;

          link = <a href={href} onClick={this.handleLinkClick}>watch game</a>;

          players = <span>
                      {_.first(message.data.players).nickname} vs
                      {_.last(message.data.players).nickname}
                    </span>;
          game_id = <span>({message.data.id})</span>;

          return <div>{link}: {players} {game_id}</div>
        }, this)
      }</pre>
    </div>
  }
});

