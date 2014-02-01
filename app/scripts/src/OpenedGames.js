/** @jsx React.DOM */
var OpenedGames = React.createClass({
  getInitialState: function() {
    return {messages: []};
  },

  mixins: [SetIntervalMixin],

//[TODO]Обрабатывать случай, когда нет игр
  render: function() {
    return <div> {
        this.state.messages.map(function (message) {
          href = settings.host + "/games/" + message.data.id + "/join";

          game = <span>
                   {message.data.game.level}{'\u00A0'}
                   {message.data.player.lang}
                 </span>;

          return (
            <div>
              {game} game by <b>{message.data.player.nickname}</b>.<br/>
              <LangsLinks
                langs={message.data.game.langs}
                href={href}
                onLinkClick={this.handleLinkClick}
              />
            </div>);
        }, this)
    }</div>
  }
});

