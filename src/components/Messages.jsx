import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { messageActions } from '../slices/messagesSlice';

const mapStateToProps = (state) => {
  const { messages: { byId, allIds }, channels: { activeId } } = state;
  const messages = allIds.map((id) => byId[id]).reverse();
  return { messages, activeId };
};

const actionCreators = {
  addMessage: messageActions.addMessage,
};

const Messages = (props) => {
  useEffect(() => {
    const { data, addMessage } = props;
    const { messages } = data;
    messages.forEach((element) => { addMessage({ message: element }); });
  }, [null]);

  const renderMessages = (messages) => {
    if (messages.length === 0) {
      return null;
    }
    const { activeId } = props;

    const preRender = messages.map((message) => {
      const {
        text, id, userName, channelId,
      } = message;
      return channelId === activeId ? (
        <div key={id}>
          <b>
            {userName}
            {': '}
          </b>
          {text}
        </div>
      ) : '';
    });


    return (
      <div id="messages-box" className="chat-messages overflow-auto mb-3">

        {preRender}

      </div>
    );
  };

  const { messages } = props;
  return renderMessages(messages);
};
// <div id="messages-box" className="chat-messages overflow-auto mb-3" />;
export default connect(mapStateToProps, actionCreators)(Messages);
