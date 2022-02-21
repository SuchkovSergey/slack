import i18next from 'i18next';
import React, { useEffect, useRef } from 'react';
import { FormGroup } from 'react-bootstrap';
import axios from 'axios';
import routes from '../../routes';
import ModalContainer from '../common/ModalContainer';

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
    <ModalContainer
      titleKey="removeTitle"
      onHide={onHide}
    >
      <form onSubmit={onSubmit}>
        <FormGroup>
          <input
            ref={inputRef}
            type="submit"
            className="btn btn-danger"
            value={i18next.t('removeChannel')}
          />
        </FormGroup>
      </form>
    </ModalContainer>
  );
};
