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

const mapStateToProps = (state) => {
  const { channels: { activeId } } = state;
  return { activeId };
};


class NewMessageForm extends React.Component {
    onSubmitHandler = async (values, { resetForm }) => {
      const { activeId } = this.props;
      document.querySelector('input').focus();
      if (values.text === '') {
        return;
      }
      await axios.post(routes.channelMessagesPath(activeId), {
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

export default connect(mapStateToProps, actionCreators)(NewMessageForm);
// export default Channels;
