import React, { Component } from "react";
import OpenedGame from "./OpenedGame";

export default class OpenedGames extends Component {
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

  render() {
    const games = this.state.games;
    return (
      <dl>
        <dt>
          <h4>Opened games <span className="badge">{games.length}</span></h4>
        </dt>

        { games.length > 0 ?
            games.map((game) => {
              return <dd key={"opened-" + game.game.id}><OpenedGame key={game.game.id} game={game} /></dd>;
            })
          : "" }
      </dl>
    );
  }
};

OpenedGames.propTypes = { type: React.PropTypes.string.isRequired };
