import React, { useState } from 'react';
// import React, { useState, useRef } from 'react';
import Messages from './Messages';
import NewMessageForm from './NewMessageForm';
import Channels from './Channels';
import getModal from './modals/index.js';

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }
  console.log(modalInfo.type);

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} size="xl" />;
};


const App = (props) => {
  // componentDidMount() {
  //   document.querySelector('input').focus();
  // }


  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });


  const { data } = props;
  return (
    <div className="row h-100 pb-3">
      <div className="col-3 border-right">
        <Channels data={data} showModal={showModal} />
      </div>
      <div className="col-9 h-100">
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


// const newApp = () => {
//   // const [items, setItems] = useImmer([]);
//   const [modalInfo, setModalInfo] = useState({ type: null, item: null });
//   const hideModal = () => setModalInfo({ type: null, item: null });
//   const showModal = (type, item = null) => setModalInfo({ type, item });

//   return (
//     <>
//       <div className="mb-3">
//         <button
// onClick={() => showModal('adding')}
// data-testid="item-add"
// className="btn btn-secondary">
// add</button>
//       </div>
//       {renderModal({ modalInfo, hideModal })}
//     </>
//   );
// };
