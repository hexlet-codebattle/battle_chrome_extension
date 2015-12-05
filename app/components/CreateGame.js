import cx from "classnames";
import React, {Component} from "react";
import SETTINGS from "../../chrome/app/settings";

const CreateGame = (props) => {
  const gamesHref = SETTINGS.host + "/games/"

  return (
    <div>
      <a className="btn btn-default btn-lg new_game_button" href={gamesHref} target="_blank" role="button">
        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> New
      </a>
    </div>
  );
};

export default CreateGame;

