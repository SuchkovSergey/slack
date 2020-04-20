import React from 'react';
import { ListGroup } from 'react-bootstrap';
import _ from 'lodash';

export default class Channels extends React.PureComponent {
  render() {
    const { data } = this.props;
    const { channels } = data;
    return (
      <div>
        <div className="d-flex mb-2">
          <span>Channels</span>
          <button type="button" className="btn btn-link p-0 ml-auto">+</button>
        </div>
        <ListGroup as="ul">
          {channels.map((el) => <ListGroup.Item key={_.uniqueId()} as="li" className="center-block active">{el.name}</ListGroup.Item>)}
        </ListGroup>
      </div>
    );
  }
}
