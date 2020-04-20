import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'

const mapStateToProps = (state) => {
  const { messages: { byId, allIds } } = state;
  const messages = allIds.map((id) => byId[id]).reverse();
  return { messages };
};

const actionCreators = {
  addMessage: actions.addMessage,
};

class Messages extends React.PureComponent {
  renderMessages = (messages) => {
    if (messages.length === 0) {
      return null;
    }
   
    return (
      <div id="messages-box" className="chat-messages overflow-auto mb-3">
        <ul className="list-group">
          {messages.map(({ text, id }) => (
            <li key={id} className="d-flex"><b>{'Username: '}</b>{text}</li>
          ))}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    const { data, addMessage } = this.props;
    const { messages } = data;
    // console.log('mount', messages);
    messages.forEach((element) => { addMessage({ message: element })  });
  }
  
  render() {
    const { messages } = this.props;
    return this.renderMessages(messages);
  }
}
<div id="messages-box" class="chat-messages overflow-auto mb-3"></div>
export default connect(mapStateToProps, actionCreators)(Messages);



const symbols = (num) => {
  const result = [];
  for (let i = 0; i < num; i += 1) {
    result.push(i);
  }
  return (
    <div>
      {result.map(() => (
        <div>
          <b>Сергей Сучков</b>
          : Проверка проверочка
        </div>
      ))}
    </div>
  );
};
