/** @jsx React.DOM */
var LangsLinks = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    links =_.map(this.props.langs, function (lang_info) {
          href = this.props.href + "?lang=" + lang_info.lang;
          link = <a href={href} onClick={this.props.onLinkClick}
                    className={lang_info.passed ? "game_passed_link" : "game_link"}>
                   <span>{lang_info.lang}</span>
                 </a>;
          return <span>{'\u00A0'}{link}</span>;
        }, this)
    return <span>join as:{links}</span>
  }
});

