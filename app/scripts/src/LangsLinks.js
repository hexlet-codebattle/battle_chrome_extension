/** @jsx React.DOM */
var LangsLinks = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    links =_.map(this.props.langs, function (lang_info) {
          link = <a href={this.props.href} onClick={this.props.onLinkClick}>
                   <span>{lang_info.lang}</span>
                 </a>;
          return <span>{'\u00A0'}{link}</span>;
        }, this)
    return <span>join as:{links}</span>
  }
});

