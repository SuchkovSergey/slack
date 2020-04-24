import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Formik } from 'formik';
// import {  Formik, ErrorMessage } from 'formik';
import { FormControl } from 'react-bootstrap';
import cookies from 'js-cookie';
import routes from '../routes';
import { messageActions } from '../slices/messagesSlice';

const actionCreators = {
  addMessage: { messageActions }.addMessage,
};

class NewMessageForm extends React.Component {
    onSubmitHandler = async (values, { resetForm }) => {
      document.querySelector('input').focus();
      if (values.text === '') {
        return;
      }
      await axios.post(routes.channelMessagesPath(0), {
        data: {
          attributes: {
            text: values.text, userName: cookies.get('userName'),
          },
        },
      });
      resetForm({});
    }

    render() {
      return (
        <div className="app mt-auto">
          <Formik
            initialValues={{ text: '' }}
            onSubmit={this.onSubmitHandler}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleSubmit,
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <FormControl
                    id="text"
                    placeholder="Write your message here"
                    type="text"
                    value={values.text}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                  )}
                  <div className="d-block invalid-feedback">&nbsp;</div>

                </form>
              );
            }}
          </Formik>
        </div>
      );
    }
}

export default connect(null, actionCreators)(NewMessageForm);
// export default Channels;
