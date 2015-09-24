require("expose?$!expose?jQuery!jquery");
require("expose?React!react");

require("../../assets/stylesheets/application.css");
require("bootstrap/dist/css/bootstrap.min.css");

var settings = chrome.extension.getBackgroundPage().settings;

import OpenedGames from "../../../app/components/OpenedGames";
import StartedGames from "../../../app/components/StartedGames";

$(function() {
  React.renderComponent(OpenedGames({type: "opened"}), document.getElementById('opened_games'));
  React.renderComponent(StartedGames({type: "started"}), document.getElementById('started_games'));
});
