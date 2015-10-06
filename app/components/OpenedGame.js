import cx from "classnames";
import React, {Component} from "react";
import SETTINGS from "../../chrome/app/settings";

const OpenedGame = (props) => {
  const game = props.game;
  const mainHref = SETTINGS.host + "/games/" + game.game.id + "/join";
  const member = game.members[0];

  return (
    <div>
      {game.game.challenge_build.level + " " + member.lang + " game by "} <a href="#">{member.username}</a>.

      <p>
        join as:
        {game.game.build_langs.map((langInfo) => {
          const href = mainHref + "?lang=" + langInfo.lang;
          const classes = cx({"game-passed-link": langInfo.passed});

          return (
            <span className="join-lang" key={langInfo.lang}>
              <a href={href} target="_blank" className={classes}>{langInfo.lang}</a>
            </span>
            );
        })}
      </p>
    </div>
  );
};

export default OpenedGame;
