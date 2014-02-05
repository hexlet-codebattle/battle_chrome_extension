/** @jsx React.DOM */
var OpenedGames = React.createClass({
  getInitialState: function() {
    return {messages: []};
  },

  mixins: [SetIntervalMixin],

  render: function() {
    return (
      <div>
        {this.state.messages.length > 0 ?
          _.map(this.state.messages, function (message) {
            href = settings.host + "/games/" + message.data.id + "/join";

            return (
              <div>
                <div>
                  {message.data.game.level}{'\u00A0'}
                  {message.data.player.lang}
                  game by <b>{message.data.player.nickname}</b>.<br/>
                </div>

                <p>
                  join as:
                    {_.map(message.data.extended_langs, function (lang_info) {
                      href = href + "?lang=" + lang_info.lang;
                      return (
                        <span className="join-lang">
                          <a href={href} onClick={this.handleLinkClick}
                             className={lang_info.passed ? "game_passed_link" : ""}>
                            {lang_info.lang}
                          </a>
                        </span>
                      )
                    }, this)}
                </p>
              </div>
            )
          }, this)
        : "No opened games"
        }
      </div>
    )
  }
});

