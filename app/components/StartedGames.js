import React, { Component } from "react";
import _ from "lodash";
import SETTINGS from "../../chrome/app/settings";

export default class StartedGames extends Component {

  constructor(props) {
    super(props);
    this.state = {games: []};
  }

  componentWillMount() {
    this.getMessagesFromServer();
    setInterval(this.getMessagesFromServer.bind(this), 3000);
  }

  getMessagesFromServer() {
    const games = chrome.extension.getBackgroundPage().getGames(this.props.type);
    if (games) {
      this.setState({ games: games });
    }
  }

  render () {
    const games = this.state.games;
    return (
      <dl>
        <dt><h4>Started games <span className="badge">{games.length}</span></h4></dt>
        {games.length > 0 ?
          games.map((game) => {
            const href = SETTINGS.host + "/games/" + game.game.id;
            const nicknames = _.pluck(game.members, "username");
            const playerLangs = _.pluck(game.members, "lang");

            return (
              <dd key={"started-" + game.game.id}>
                <span>{playerLangs.join("/")} : </span>
                <a href={href} target="_blank" className="game-link">
                  {nicknames.join(" vs ")}
                </a>
              </dd>
              );
          })
        : "" }
      </dl>
    );
  }
};

StartedGames.propTypes = { type: React.PropTypes.string.isRequired };
