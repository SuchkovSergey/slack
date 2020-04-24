import React from 'react';
import { Nav } from 'react-bootstrap';
// import _ from 'lodash';
import cn from 'classnames';
import { connect } from 'react-redux';
import { channelsActions } from '../slices/channelsSlice';

const mapStateToProps = (state) => {
  const { channels: { byId, activeId } } = state;
  return { allChannels: byId, activeId };
};

const actionCreators = {
  addChannel: channelsActions.addChannel,
  selectChannel: channelsActions.selectChannel,
};


class Channels extends React.PureComponent {
  componentDidMount() {
    const { data, addChannel } = this.props;
    const { channels } = data;
    channels.forEach((element) => { addChannel({ channel: element }); });
  }


  handleSelectChannel = (id) => (e) => {
    e.preventDefault();
    const { selectChannel } = this.props;
    selectChannel({ id });
  }
  // onClick={this.handleSelectChannel}

  render() {
    const { allChannels, activeId } = this.props;
    const { showModal } = this.props;

    return (
      <div>
        <div className="d-flex mb-2">
          <span>Channels</span>
          <button onClick={showModal} type="button" className="btn btn-link p-0 ml-auto">Add new</button>
        </div>
        <Nav as="ul" className="flex-column nav-pills" variant="nav-fill">
          {allChannels.map((el) => {
            const btnClass = cn({ // change
              'nav-link btn btn-block float-left': true,
              active: el.id === activeId,
            });
            return (
              <Nav.Item key={el.id} as="li" onClick={this.handleSelectChannel(el.id)}>
                <button type="button" className={btnClass}>{el.name}</button>
              </Nav.Item>
            );
          })}
        </Nav>
      </div>
    );
  }
}


export default connect(mapStateToProps, actionCreators)(Channels);
// { /* <Nav.Link href="/home" className="center-block active">{el.name}</Nav.Link> */ }
