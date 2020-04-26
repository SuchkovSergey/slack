import i18next from 'i18next';
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Formik } from 'formik';
import { FormControl } from 'react-bootstrap';
import cookies from 'js-cookie';
import routes from '../routes';
import { messageActions } from '../slices/messagesSlice';


const mapStateToProps = (state) => {
  const { channels: { activeId } } = state;
  return { activeId };
};

const actionCreators = {
  addMessage: messageActions.addMessage,
};

const NewMessageForm = (props) => {
  const [errorMessage, setErrorMessage] = useState({ text: null, show: false });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const onSubmitHandler = (values, { resetForm }) => {
    const { activeId } = props;
    document.querySelector('input').focus();
    if (values.text === '') {
      return;
    }

    const date = new Date();
    const sendTime = date.toTimeString().split(' ')[0];

    axios.post(routes.channelMessagesPath(activeId), {
      data: {
        attributes: {
          text: values.text, userName: cookies.get('userName'), sendTime,
        },
      },
    }).then(() => {
      setErrorMessage({ text: null, show: false });
    }).catch(() => {
      setErrorMessage({ text: i18next.t('errorMessages.network'), show: true });
    });

    resetForm({});
  };

  return (
    <div className="app mt-auto">
      <Formik
        initialValues={{ text: '' }}
        onSubmit={onSubmitHandler}
      >
        {(formProps) => {
          const {
            values,
            isSubmitting,
            handleChange,
            handleSubmit,
          } = formProps;
          return (
            <form onSubmit={handleSubmit} className="input-group">
              <FormControl
                id="text"
                ref={inputRef}
                placeholder={i18next.t('mainInputPlaceholder')}
                type="text"
                value={values.text}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <span className="input-group-btn">
                <button type="submit" className="btn btn-info">{i18next.t('sendButton')}</button>
              </span>
              {errorMessage.show && (
              <div className="input-feedback text-danger">{errorMessage.text}</div>
              )}
              <div className="d-block invalid-feedback">&nbsp;</div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(NewMessageForm);
