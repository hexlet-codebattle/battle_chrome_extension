import React from "react";
import SetIntervalMixin from "../mixin/mixin";
import OpenedGame from "./OpenedGame"

export default React.createClass({
  getInitialState: function() {
    return {messages: []};
  },

  mixins: [SetIntervalMixin],

  render: function() {
    var messages = this.state.messages;

    return (
      <dl>
        <dt>
          <h4>Opened games <span className="badge">{messages.length}</span></h4>
        </dt>

        {messages.length > 0 ?
          messages.map(function(message) {
            return (
              <dd><OpenedGame key={message.id} message={message} /></dd>
            )
          }, this)
        : ""}
      </dl>
    )
  }
});

