/** @jsx React.DOM */
$(function() {

  var messages = chrome.extension.getBackgroundPage().messages;
  var settings = chrome.extension.getBackgroundPage().settings;

  var BattleApp = React.createClass({displayName: 'BattleApp',
    render: function() {
      var games = this.props.messages.map(function (message) {
        return BattleGame( {game:message.data} );
      });

      return React.DOM.div(null, 
        React.DOM.pre(null, 
          games
        )
      )
    }
  });

  React.renderComponent(BattleApp( {messages:messages}), document.getElementById('games'));
});
