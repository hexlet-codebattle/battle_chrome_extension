/** @jsx React.DOM */
var OpenedGames = React.createClass({
  getInitialState: function() {
    return {messages: []};
  },

  mixins: [SetIntervalMixin],

//[TODO]Написать вьюху конкретно под открытые игры
//[TODO]Обрабатывать случай, когда нет игр
  render: function() {
    return <div>
      <pre>{
        this.state.messages.map(function (message) {
          href = settings.host + "/games/" + message.data.id + "/join";
          link = <a href={href} onClick={this.handleLinkClick}>Join</a>;
          span = <span> to {message.data.id} </span>;
          return <div>{link} {span}</div>
        }, this)
      }</pre>
    </div>
  }
});

