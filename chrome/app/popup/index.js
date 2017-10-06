require("expose-loader?$!expose-loader?jQuery!jquery");
require("expose-loader?React!react");
require("../../assets/stylesheets/application.css");
require("bootstrap/dist/css/bootstrap.min.css");

import OpenedGames from "../../../app/components/OpenedGames";
import StartedGames from "../../../app/components/StartedGames";
import React from "react";
import ReactDOM from "react-dom";

$(() => {
  ReactDOM.render(<OpenedGames type="opened"/>, $("#opened_games")[0]);
  ReactDOM.render(<StartedGames type="started"/>, $("#started_games")[0]);
});
