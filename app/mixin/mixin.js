export var SetIntervalMixin = {
  getMessagesFromServer: function() {
    var messages = chrome.extension.getBackgroundPage().messages;
    this.setState({messages: messages[this.props.type]});
  },

  componentWillMount: function() {
    this.getMessagesFromServer();
    setInterval(this.getMessagesFromServer, 500);
  }
};
