import React, { useState, useEffect } from 'react';
// import React, { useState, useRef } from 'react';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';
import Channels from './Channels';
import getModal from './modals/index.js';
// import cookies from 'js-cookie';

/*
  Пояснение для ментора
  Пока не стал использовать Context для передачи имени пользователя,
  так как не вижу в этом смысла.
  В запрос на сервер имя попадает через "cookies.get('userName')"
  В компоненте Messages же имя попадает вместе с другой информацией о сообщении в чате
  И выделять отдельно передачу никнейма через Контекст не вижу смысла
  В общем, если я где-то торможу в этом вопросе, прошу направить
*/

// const userName = cookies.get('userName');
// const UserNameContext = React.createContext(userName);
// <MyContext.Provider value={userName}>
// </MyContext.Provider>

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }
  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} size="xl" />;
};

const App = (props) => {
  useEffect(() => {
    document.querySelector('input').focus();
  }, [null]);

  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  const { data } = props;
  return (
    <div className="row h-100 pb-3">
      <div className="col-3 border-right">
        <Channels data={data} showModal={showModal} />
      </div>
      <div className="col-9 h-100" style={{ backgroundColor: '#E1ECF9' }}>
        <div className="d-flex flex-column h-100">
          <Messages data={data} />
          <NewMessageForm />
        </div>
      </div>
      {renderModal({ modalInfo, hideModal })}
    </div>
  );
};

export default App;
