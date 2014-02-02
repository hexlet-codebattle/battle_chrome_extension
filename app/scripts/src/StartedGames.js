/** @jsx React.DOM */
var StartedGames = React.createClass({
  getInitialState: function() {
    return {messages: []};
  },

  mixins: [SetIntervalMixin],

  render: function() {

    return (
      <div>
        {this.state.messages.length > 0 ?
          _.map(this.state.messages, function (message) {
            href = settings.host + "/games/" + message.data.id;
            nicknames = _.pluck(message.data.players, "nickname");
            player_langs = _.pluck(message.data.players, "lang");

            return (
              <div>
                <span>{player_langs.join("/")} : </span>
                <a href={href} onClick={this.handleLinkClick} className="game_link">
                  {nicknames.join(" vs ")}
                </a>
              </div>
            )
          }, this)
        : "No started games"
        }
      </div>
    )
  }
});

