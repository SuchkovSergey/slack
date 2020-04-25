import { connect } from 'react-redux';
import React, { useEffect } from 'react';
// import React, { useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import cookies from 'js-cookie';
import $ from 'jquery';
import { messageActions } from '../slices/messagesSlice';

// const userName = cookies.get('userName');
// const MyContext = React.createContext({});
// const ThingsProvider = MyContext.Provider
// const things = useContext(MyContext)


const mapStateToProps = (state) => {
  const { messages: { byId }, channels: { activeId } } = state;
  const messages = Object.values(byId);
  return { messages, activeId };
};

const actionCreators = {
  addMessage: messageActions.addMessage,
};

const scrollMessagesTop = () => $('#messages-box').animate({ scrollTop: 100000 }, 'slow');

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
        text, id, userName, channelId, sendTime,
      } = message;
      const currentUser = cookies.get('userName');
      if (channelId !== activeId) {
        return '';
      }
      const messageArea = (
        <Button className="border-0" variant="outline-dark" style={{ backgroundColor: '#F6FFF7' }}>
          <div>
            {text}
            <font className="m-1" size="2" color="gray">{sendTime}</font>
          </div>
        </Button>
      );
      const userNameArea = <b className="m-1">{userName}</b>;
      return currentUser === userName
        ? (
          <div key={id} className="text-right m-2">
            {messageArea}
            {userNameArea}
          </div>
        )
        : (
          <div key={id} className="m-2">
            {userNameArea}
            {messageArea}
          </div>
        );
    });

    scrollMessagesTop();

    return (
      <div id="messages-box" className="chat-messages overflow-auto mb-1">
        {preRender}
      </div>
    );
  };

  const { messages } = props;
  return renderMessages(messages);
};

export default connect(mapStateToProps, actionCreators)(Messages);
