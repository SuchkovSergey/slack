import i18next from 'i18next';
import React, { useEffect, useRef } from 'react';
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { useFormik } from 'formik';
import cookies from 'js-cookie';
import ModalContainer from '../common/ModalContainer';

const generateOnSubmit = ({ onHide }) => ({ name, surname }) => {
  cookies.set('userName', `${name} ${surname}`);
  onHide();
};

export default (props) => {
  const form = useFormik({
    onSubmit: generateOnSubmit(props),
    initialValues: { name: '', surname: '' },
  });
  const { onHide } = props;
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [null]);

  return (
    <ModalContainer
      titleKey="userNameModalTitle"
      onHide={onHide}
    >
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
            placeholder={i18next.t('userSurnamePlaceholder')}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.surname}
            name="surname"
          />
        </FormGroup>
        <input
          type="submit"
          className="btn btn-primary"
          value={i18next.t('userNameModalSubmit')}
        />
      </form>
    </ModalContainer>
  );
};
