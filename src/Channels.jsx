import React from 'react';
import { ListGroup } from 'react-bootstrap';

export default class Channels extends React.Component {
  render() {
    const { data } = this.props;
    const { channels } = data;
    return (
      <ListGroup as="ul">
        <div>hehehe</div>
        <div>hohoho</div>
        {channels.map((el) => <ListGroup.Item as="li">{el.name}</ListGroup.Item>)}
      </ListGroup>
    );
  }
}