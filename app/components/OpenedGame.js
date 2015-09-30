import cx from "classnames";
import React, {Component} from "react";
import { settings } from "../../chrome/app/settings";

const OpenedGame = (props) => {
  const currentSettings = __DEVELOPMENT__ ? settings.dev : settings.prod;

  const message = props.message;
  const mainHref = currentSettings.host + "/games/" + message.game.id + "/join";

  return (
    <div>
      {message.game.challenge_build.level + " " + message.game_member.lang + " game by "} <a href="#">{message.game_member.username}</a>.

      <p>
        join as:
        {message.game.build_langs.map((langInfo) => {
          let href = mainHref + "?lang=" + langInfo.lang;
          const classes = cx({"game-passed-link": langInfo.passed});

          return (
            <span className="join-lang">
              <a href={href} target="_blank" className={classes}>{langInfo.lang}</a>
            </span>
            );
        }, this)}
      </p>
    </div>
  );
};

export default OpenedGame;
