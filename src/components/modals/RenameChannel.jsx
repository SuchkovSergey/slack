import i18next from 'i18next';
import React, { useEffect, useRef } from 'react';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import routes from '../../routes';

const generateOnSubmit = ({ modalInfo, onHide }) => async (values) => {
  await axios.patch(routes.channelPath(modalInfo.item.id), {
    data: {
      attributes: {
        name: values.body,
      },
    },
  });
  onHide();
};

export default (props) => {
  const { onHide, modalInfo } = props;
  const { name } = modalInfo.item;
  const form = useFormik({ onSubmit: generateOnSubmit(props), initialValues: { body: name } });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, [null]);

  return (
    <Modal.Dialog size="lg" centered aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{i18next.t('renameTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={form.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.body}
              name="body"
            />
          </FormGroup>
          <input type="submit" className="btn btn-primary" value={i18next.t('renameChannel')} />
        </form>
      </Modal.Body>
    </Modal.Dialog>
  );
};
