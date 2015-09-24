import React from "react";

export default  React.createClass({
  render: function() {
    var message = this.props.message;
    href = settings.host + "/games/" + message.id + "/join";

    var cx = React.addons.classSet;
    return (
      <div>
        {message.game.level + " " + message.player.lang + " game by "} <a href="#">{message.player.nickname}</a>.

        <p>
          join as:
            {message.extended_langs.map(function(lang_info) {
              href = href + "?lang=" + lang_info.lang;
              var classes = cx({game_passed_link: lang_info.passed});

              return (
                <span className="join-lang">
                  <a href={href} target="_blank" className={classes}>{lang_info.lang}</a>
                </span>
              )
            }, this)}
        </p>
      </div>
    )
  }
});
