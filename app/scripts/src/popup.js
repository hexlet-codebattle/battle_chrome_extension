/** @jsx React.DOM */
$(function() {

  var messages = chrome.extension.getBackgroundPage().messages;
  var settings = chrome.extension.getBackgroundPage().settings;

  var BattleApp = React.createClass({
    render: function() {
      var games = this.props.messages.map(function (message) {
        return <BattleGame game={message.data} />;
      });

      return (
        <div>
          <pre>
            {games}
          </pre>
        </div>
      )
    }
  });

  React.renderComponent(<BattleApp messages={messages}/>, document.getElementById('games'));

  $('a').click(function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });
});
