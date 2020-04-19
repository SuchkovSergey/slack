import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';

import { ListGroup, Scrollspy } from 'react-bootstrap';
import routes from './routes';
// import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { messages: { byId, allIds } } = state;
  const messages = allIds.map((id) => byId[id]);
  return { messages };
};

// const actionCreators = {
//   addMessage: actions.addMessage,
// };

const request = async () => {
  const data = {
  };
  const response = await axios.post(routes, data);
};


class Channels extends React.Component {
  render() {
    return (
      <div className="app">
        <Formik
          initialValues={{ text: '' }}
          onSubmit={async (values) => {
            // здесь асинхронно делаем запрос на сервер с текстом сообщения
            // здесь же нужно писать логику вывода сообщений о проблемах с сетью
            await new Promise((resolve) => setTimeout(resolve, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <input
                  id="text"
                  placeholder="Write your message here"
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                <div className="input-feedback">{errors.email}</div>
                )}
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </button>
                <button type="submit" disabled={isSubmitting}>Send</button>
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

// export default connect(null, actionCreators)(Channels);
export default Channels;
