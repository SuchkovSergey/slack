import i18next from 'i18next';
import React, { useEffect, useRef } from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import routes from '../../routes';

const generateOnSubmit = ({ modalInfo, onHide }) => async () => {
  await axios.delete(routes.channelPath(modalInfo.item.id), {});
  onHide();
};

export default (props) => {
  const { onHide } = props;
  const onSubmit = generateOnSubmit(props);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [null]);

  return (
    <Modal.Dialog centered aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{i18next.t('removeTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          <FormGroup>
            <input ref={inputRef} type="submit" className="btn btn-danger" value={i18next.t('removeChannel')} />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal.Dialog>
  );
};
