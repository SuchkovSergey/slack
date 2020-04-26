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
  const [showError, setError] = useState(false);
  const inputRef = useRef();

  const onSubmitHandler = (values, { resetForm }) => {
    const { activeId } = props;
    const date = new Date();
    axios
      .post(routes.channelMessagesPath(activeId), {
        data: {
          attributes: {
            text: values.text,
            userName: cookies.get('userName'),
            sendTime: date.toTimeString().split(' ')[0],
          },
        },
      })
      .then(() => { setError(false); })
      .catch(() => { setError(true); });

    resetForm({});
  };

  const formikElement = ({
    values, isSubmitting, handleChange, handleSubmit,
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
          {showError && (<div className="input-feedback text-danger">{i18next.t('errors.network')}</div>)}
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

export default connect(mapStateToProps, actionCreators)(NewMessageForm);
