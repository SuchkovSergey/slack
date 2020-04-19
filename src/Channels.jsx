import React from 'react';
import { ListGroup } from 'react-bootstrap';

export default class Channels extends React.PureComponent {
  render() {
    const { data } = this.props;
    const { channels } = data;
    return (
      <div>
        <div className="d-flex mb-2">
          <span>Channels</span>
          <button className="btn btn-link p-0 ml-auto">+</button>
        </div>
        <ListGroup as="ul">
          {channels.map((el) => <ListGroup.Item as="li" className="center-block">{el.name}</ListGroup.Item>)}
        </ListGroup>
      </div>
    );
  }
}
