import React, { Component } from "react";
import _ from "lodash";
import { settings } from "../../chrome/app/settings";

export default class StartedGames extends Component {

  constructor(props) {
    super(props);
    this.state = {messages: []};
  }

  componentWillMount() {
    this.getMessagesFromServer.apply(this);
    setInterval(this.getMessagesFromServer.bind(this), 500);
  }

  getMessagesFromServer() {
    let messages = chrome.extension.getBackgroundPage().messages;
    if (messages)
      this.setState({messages: messages[this.props.type]});
  }

  render () {
    const currentSettings = __DEVELOPMENT__ ? settings.dev : settings.prod;
    const messages = this.state.messages;
    return (
      <dl>
        <dt><h4>Started games <span className="badge">{messages.length}</span></h4></dt>
        {messages.length > 0 ?
          messages.map(function(message) {
          var href = currentSettings.host + "/games/" + message.game.id;
          var nicknames = _.pluck(message.members, "username");
          var playerLangs = _.pluck(message.members, "lang");

          return (
            <dd>
              <span>{playerLangs.join("/")} : </span>
              <a href={href} target="_blank" className="game-link">
                {nicknames.join(" vs ")}
              </a>
            </dd>
            );
        }, this)
          : ""
        }
      </dl>
    );
  }
};

StartedGames.propTypes = { type: React.PropTypes.string.isRequired };

