import cx from "classnames";
import React, {Component} from "react";
import SETTINGS from "../../chrome/app/settings";

const OpenedGame = (props) => {
  const game = props.game;
  const mainHref = SETTINGS.host + "/games/" + game.game.id;
  const member = game.members[0];

  return (
    <div>
      <a href={mainHref}>
        {game.game.challenge_build.level + " game by " + member.username}
      </a>
    </div>
  );
};

export default OpenedGame;
