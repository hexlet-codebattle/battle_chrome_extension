require("expose?$!expose?jQuery!jquery");
require("expose?React!react");
require("../../assets/stylesheets/application.css");
require("bootstrap/dist/css/bootstrap.min.css");

import OpenedGames from "../../../app/components/OpenedGames";
import StartedGames from "../../../app/components/StartedGames";
import CreateGame from "../../../app/components/CreateGame";
import React from "react";
import ReactDOM from "react-dom";

$(() => {
  ReactDOM.render(<OpenedGames type="opened"/>, $("#opened_games")[0]);
  ReactDOM.render(<StartedGames type="started"/>, $("#started_games")[0]);
  ReactDOM.render(<CreateGame type="create"/>, $("#create_game")[0]);
});
