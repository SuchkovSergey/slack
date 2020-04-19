import React from 'react';


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

// const mapStateToProps = (state) => {
//   const { messages: { byId, allIds } } = state;
//   const messages = allIds.map((id) => byId[id]);
//   return { messages };
// };

class Messages extends React.Component {
  render() {
    // const { messages } = this.props;

    // if (messages.length === 0) {
    //   return null;
    // }

    return (
      <div className="mt-3">
        <ul className="list-group">
          {symbols(20)}
        </ul>
      </div>
    );
  }
}

// export default connect(mapStateToProps, null)(Messages);
export default Messages;
// {messages.map(({ id, text }) => (
//   <li key={id} className="list-group-item d-flex">{text}</li>
// ))}
