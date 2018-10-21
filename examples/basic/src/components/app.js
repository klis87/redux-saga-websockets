import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sendMessage } from '../store/actions';

// You should use selectors here in your real projects, here we don't for simplicity
const mapStateToProps = state => ({
  messages: state.messages,
});

const mapDispatchToProps = {
  sendMessage,
};

class App extends Component {
  state = {
    title: '',
    body: '',
  };

  render() {
    const { messages, sendMessage } = this.props;

    return (
      <div>
        <h1>Redux Saga Websockets basic example</h1>
        <input
          type="text"
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
          placeholder="title"
        />
        <input
          type="text"
          value={this.state.body}
          onChange={e => this.setState({ body: e.target.value })}
          placeholder="body"
        />
        <button
          onClick={() => {
            const { title, body } = this.state;
            if (!title || !body) return;
            sendMessage(title, body);
            this.setState({ title: '', body: '' });
          }}
        >
          Send a message
        </button>
        <hr />
        <h2>Messages</h2>
        {messages.length > 0 ? (
          <div>
            {messages.map((message, i) => (
              <div key={i}>
                <h3>{message.title}</h3>
                <p>{message.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>There is no any message yet</p>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
