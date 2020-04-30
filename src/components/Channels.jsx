import i18next from 'i18next';
import { Nav } from 'react-bootstrap';
import cn from 'classnames';
import { connect, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { TrashFill, PencilSquare } from 'react-bootstrap-icons';
import channelsActions from '../slices/channelsSlice';

const actionCreators = {
  addChannel: channelsActions.addChannel,
  selectChannel: channelsActions.selectChannel,
};

const Channels = (props) => {
  const allChannels = useSelector(({ channels: { byId } }) => byId);
  const activeChannelId = useSelector(({ channels: { activeId } }) => activeId);

  const {
    showModal, selectChannel, addChannel, data: { channels },
  } = props;

  const defaultChannelId = 1;
  useEffect(() => {
    channels.forEach((element) => { addChannel({ channel: element }); });
    selectChannel({ id: defaultChannelId });
  }, [null]);

  const handleSelectChannel = (id) => () => { selectChannel({ id }); };

  const renderNavs = allChannels.map((el) => {
    const btnClass = cn({
      'nav-link btn btn-block m-1': true,
      active: el.id === activeChannelId,
    });
    return (
      <Nav.Item key={el.id} as="li">
        <button type="button" className={btnClass} onClick={handleSelectChannel(el.id)}>
          <div className="float-left">{el.name}</div>
          {el.removable && (
            <div className="float-right align-middle">
              <TrashFill onClick={() => showModal('removeChannel', el)} className="mr-1" />
              <PencilSquare onClick={() => showModal('renameChannel', el)} />
            </div>
          )}
        </button>
      </Nav.Item>
    );
  });

  return (
    <div className="mt-2">
      <h5 className="d-flex mb-2">
        <span>{i18next.t('channels')}</span>
        <button
          onClick={() => showModal('addChannel')}
          type="button"
          className="btn btn-link p-0 ml-auto"
        >
          {i18next.t('addNewChannel')}
        </button>
      </h5>
      <Nav as="ul" className="flex-column nav-pills" variant="nav-fill">
        {renderNavs}
      </Nav>
    </div>
  );
};

export default connect(null, actionCreators)(Channels);
