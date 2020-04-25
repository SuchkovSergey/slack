import i18next from 'i18next';
import React, { useEffect, useRef } from 'react';
import {
  Modal, FormGroup, FormControl, FormLabel,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import cookies from 'js-cookie';

const generateOnSubmit = ({ onHide }) => (values) => {
  const userName = `${values.name} ${values.surname}`;
  cookies.set('userName', userName);
  onHide();
};

export default (props) => {
  const form = useFormik({ onSubmit: generateOnSubmit(props), initialValues: { name: '', surname: '' } });
  const { onHide } = props;

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [null]);

  return (
    <Modal.Dialog centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{i18next.t('userNameModalTitle').split('\n').map((line) => <div>{line}</div>)}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FormLabel>{i18next.t('userNameModalName')}</FormLabel>
        <form onSubmit={form.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              placeholder={i18next.t('userNamePlaceholder')}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.name}
              name="name"
            />
            <FormLabel className="mt-2">{i18next.t('userNameModalSurname')}</FormLabel>
            <FormControl
              required
              placeholder={i18next.t('userSuramePlaceholder')}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.surname}
              name="surname"
            />
          </FormGroup>
          <input type="submit" className="btn btn-primary" value={i18next.t('userNameModalSubmit')} />
        </form>
      </Modal.Body>
    </Modal.Dialog>
  );
};
