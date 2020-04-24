// import React from 'react';
import { Nav } from 'react-bootstrap';
// import _ from 'lodash';
import cn from 'classnames';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { TrashFill, PencilSquare } from 'react-bootstrap-icons';
import { channelsActions } from '../slices/channelsSlice';

const mapStateToProps = (state) => {
  const { channels: { byId, activeId } } = state;
  return { allChannels: byId, activeId };
};

const actionCreators = {
  addChannel: channelsActions.addChannel,
  selectChannel: channelsActions.selectChannel,
};


const Channels = (props) => {
  useEffect(() => {
    const { data, addChannel } = props;
    const { channels } = data;
    channels.forEach((element) => { addChannel({ channel: element }); });
  }, [null]);// ,[null]


  const handleSelectChannel = (id) => (e) => { // тут косяк
    e.preventDefault();
    const { selectChannel } = props;
    selectChannel({ id });
  };


  // onClick={this.handleSelectChannel}


  const { allChannels, activeId } = props;
  const { showModal } = props;

  return (
    <div>
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button onClick={() => showModal('addChannel')} type="button" className="btn btn-link p-0 ml-auto">Add new</button>
      </div>
      <Nav as="ul" className="flex-column nav-pills" variant="nav-fill">
        {allChannels.map((el) => {
          const btnClass = cn({
            'nav-link btn btn-block': true,
            active: el.id === activeId,
          });
          return (

            <Nav.Item key={el.id} as="li">
              <button type="button" className={btnClass} onClick={handleSelectChannel(el.id)}>
                <div className="float-left">{el.name}</div>
                {el.removable && <TrashFill onClick={() => showModal('removeChannel', el)} className="float-right" />}
                {el.removable && <PencilSquare onClick={() => showModal('renameChannel', el)} className="float-right" />}

              </button>

            </Nav.Item>

          );
        })}
      </Nav>
    </div>
  );
};

// onClick={() => showModal('renameChannel', el)}
export default connect(mapStateToProps, actionCreators)(Channels);
// { /* <Nav.Link href="/home" className="center-block active">{el.name}</Nav.Link> */ }
