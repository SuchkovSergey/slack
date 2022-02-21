import i18next from 'i18next';
import React, { useEffect, useRef } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import routes from '../../routes';
import ModalContainer from './ModalContainer';

const generateOnSubmit = ({ modalInfo, onHide }) => async ({ name }) => {
  await axios.patch(routes.channelPath(modalInfo.item.id), { data: { attributes: { name } } });
  onHide();
};

export default (props) => {
  const { onHide, modalInfo } = props;
  const { item: { name } } = modalInfo;
  const form = useFormik({
    onSubmit: generateOnSubmit(props),
    initialValues: { name },
  });
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.select();
  }, [null]);

  return (
    <ModalContainer
      titleKey="renameTitle"
      onHide={onHide}
    >
      <form onSubmit={form.handleSubmit}>
        <FormGroup>
          <FormControl
            required
            ref={inputRef}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.name}
            name="name"
          />
        </FormGroup>
        <input
          type="submit"
          className="btn btn-primary"
          value={i18next.t('renameChannel')}
        />
      </form>
    </ModalContainer>
  );
};
