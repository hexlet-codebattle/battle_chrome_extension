/** @jsx React.DOM */
$(function() {

  var BattleApp = React.createClass({
    getInitialState: function() {
      return {messages: []};
    },

    getMessagesFromServer: function() {
      var messages = chrome.extension.getBackgroundPage().messages;
      this.setState({messages: messages});
    },

    componentWillMount: function() {
      this.getMessagesFromServer();
      setInterval(this.getMessagesFromServer, 500);
    },

    render: function() {
      //NOTE Мне это не нравится, но JSX не поддерживает if-else
      if (this.state.messages.length == 0) {
        return <div>
          <pre>
            <label>No open games</label>
          </pre>
        </div>
      }else {
        return <div>
          <pre>
            {this.state.messages.map(function (message) {
              return <BattleGame game={message.data} />;
            })}
          </pre>
        </div>
      }
  }
});

  React.renderComponent(<BattleApp />, document.getElementById('games'));
});
