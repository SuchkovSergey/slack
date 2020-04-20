import React from 'react';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';
import Channels from './Channels';


class App extends React.PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div className="row h-100 pb-3">
        <div className="col-md-3 border-right">
          <Channels data={data} />
        </div>
        <div className="col-md-9 h-100">
          <div className="d-flex flex-column h-100">
            <Messages data={data} />
            <NewMessageForm />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
