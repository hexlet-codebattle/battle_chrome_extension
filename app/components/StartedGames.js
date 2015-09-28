import React, { Component } from 'react';
import _ from 'lodash';

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
    this.setState({messages: messages[this.props.type]});
  }

  render () {
    const messages = this.state.messages;
    return (
      <dl>
        <dt><h4>Started games <span className='badge'>{messages.length}</span></h4></dt>
        {messages.length > 0 ?
          messages.map(function(message) {
          var href = 'https://wddx.ru/games/' + message.id;
          var nicknames = _.pluck(message.players, 'nickname');
          var playerLangs = _.pluck(message.players, 'lang');

          return (
            <dd>
              <span>{playerLangs.join('/')} : </span>
              <a href={href} target='_blank' className='game-link'>
                {nicknames.join(' vs ')}
              </a>
            </dd>
            );
        }, this)
          : ''
        }
      </dl>
    );
  }
};

export default StartedGames;
