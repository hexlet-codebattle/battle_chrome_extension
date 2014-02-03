/** @jsx React.DOM */
var settings = chrome.extension.getBackgroundPage().settings;

var SetIntervalMixin = {
  getMessagesFromServer: function() {
    var messages = chrome.extension.getBackgroundPage().messages;
    this.setState({messages: messages[this.props.type]});
  },

  componentWillMount: function() {
    this.getMessagesFromServer();
    setInterval(this.getMessagesFromServer, 500);
  },

  handleLinkClick: function(e) {
    e.preventDefault();
    chrome.tabs.create({url: e.target.href});
  }
}

$(function() {
  React.renderComponent(<OpenedGames type="opened"/>, document.getElementById('opened_games'));
  React.renderComponent(<StartedGames type="started"/>, document.getElementById('started_games'));
});
