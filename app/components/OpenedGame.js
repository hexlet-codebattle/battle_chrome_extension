import cx from "classnames";
import React, {Component} from "react";
import SETTINGS from "../../chrome/app/settings";

const OpenedGame = (props) => {
  const data = props.game;
  const mainHref = SETTINGS.host + "/games/" + data.game.id;
  const member = data.members[0];

  return (
    <div>
      <a href={mainHref} target="_blank">
        {member.lang + " game by " + member.username}
      </a>
    </div>
  );
};

export default OpenedGame;
