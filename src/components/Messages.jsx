import React from 'react';
import { connect } from 'react-redux';
import { messageActions } from '../slices/messagesSlice';


const mapStateToProps = (state) => {
  const { messages: { byId, allIds } } = state;
  const messages = allIds.map((id) => byId[id]).reverse();
  return { messages };
};

const actionCreators = {
  addMessage: messageActions.addMessage,
};

class Messages extends React.PureComponent {
  componentDidMount() {
    const { data, addMessage } = this.props;
    const { messages } = data;
    messages.forEach((element) => { addMessage({ message: element }); });
  }

  renderMessages = (messages) => {
    if (messages.length === 0) {
      return null;
    }

    return (
      <div id="messages-box" className="chat-messages overflow-auto mb-3">
        <ul className="list-group">
          {messages.map(({ text, id, userName }) => (
            <li key={id} className="d-flex">
              <b>
                {userName}
                :
              </b>
              {text}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { messages } = this.props;
    return this.renderMessages(messages);
  }
}
// <div id="messages-box" className="chat-messages overflow-auto mb-3" />;
export default connect(mapStateToProps, actionCreators)(Messages);
