import i18next from 'i18next';
import React, { useEffect, useRef, useContext } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Formik } from 'formik';
import { FormControl } from 'react-bootstrap';
import { format } from 'date-fns';
import routes from '../routes';
import UserNameContext from '../userNameContext';

const NewMessageForm = () => {
  const { activeId } = useSelector((state) => state.channels);
  const userName = useContext(UserNameContext);

  const inputRef = useRef();

  const onSubmitHandler = (values, { resetForm, setErrors }) => axios
    .post(routes.channelMessagesPath(activeId), {
      data: {
        attributes: {
          text: values.text,
          userName,
          sendTime: format(new Date(), 'HH:mm:ss'),
        },
      },
    })
    .then(() => { resetForm({}); })
    .catch(() => { setErrors({ text: i18next.t('errors.newMessageForm') }); });

  const formikElement = ({
    values, isSubmitting, handleChange, handleSubmit, errors,
  }) => {
    useEffect(() => {
      inputRef.current.focus();
    });

    return (
      <form onSubmit={handleSubmit} className="input-group">
        <FormControl
          id="text"
          required
          ref={inputRef}
          placeholder={i18next.t('mainInputPlaceholder')}
          type="text"
          value={values.text}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <button type="submit" className="input-group-btn btn btn-info">{i18next.t('sendButton')}</button>
        <div className="d-block invalid-feedback">
          {errors.text && (<div className="input-feedback text-danger">{errors.text}</div>)}
        &nbsp;
        </div>
      </form>
    );
  };

  return (
    <div className="app mt-auto">
      <Formik initialValues={{ text: '' }} onSubmit={onSubmitHandler}>
        {formikElement}
      </Formik>
    </div>
  );
};

export default NewMessageForm;
