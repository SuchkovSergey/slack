import { connect } from 'react-redux';
import React, { useEffect } from 'react';
// import React, { useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import cookies from 'js-cookie';
import $ from 'jquery';
import { messageActions } from '../slices/messagesSlice';

const mapStateToProps = (state) => {
  const { messages: { byId }, channels: { activeId } } = state;
  const allMessages = Object.values(byId).filter((el) => el.channelId === activeId);
  return { allMessages, activeId };
};

const actionCreators = {
  addMessage: messageActions.addMessage,
};

const scrollMessagesTop = () => $('#messages-box').animate({ scrollTop: 100000 }, 'slow');

const renderMessages = (messages) => {
  if (messages.length === 0) { return null; }
  scrollMessagesTop();
  const currentUser = cookies.get('userName');

  return messages.map((message) => {
    const {
      text, id, userName, sendTime,
    } = message;
    const messageArea = (
      <Button className="border-0 text-left" variant="outline-dark" style={{ backgroundColor: '#F6FFF7' }}>
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
};

const Messages = (props) => {
  const { data: { messages }, addMessage, allMessages } = props;

  useEffect(() => {
    messages.forEach((el) => { addMessage({ message: el }); });
  }, [null]);

  return renderMessages(allMessages);
};

export default connect(mapStateToProps, actionCreators)(Messages);


// const userName = cookies.get('userName');
// const MyContext = React.createContext({});
// const ThingsProvider = MyContext.Provider
// const things = useContext(MyContext)
