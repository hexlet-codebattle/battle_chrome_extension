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
      var games = this.state.messages.map(function (message) {
        return <BattleGame game={message.data} />;
      });

      return <div>
        <pre>
          {games}
        </pre>
      </div>
    }
  });

  React.renderComponent(<BattleApp />, document.getElementById('games'));
});
