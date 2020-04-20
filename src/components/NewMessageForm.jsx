import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import _ from 'lodash';
import { FormControl } from 'react-bootstrap';
import routes from '../routes';
import * as actions from '../actions';

const actionCreators = {
  addMessage: actions.addMessage,
};

class Channels extends React.Component {
  handleAddMessage = async (text) => {
    // const { addMessage } = this.props;
    // const message = { channelId: 1, id: _.uniqueId(), text };
    // const response = await axios.post(routes.channelMessagesPath(1), { attributes: { text } });
    // console.log(response);
    // addMessage({ message });
  }

  // в обработчиках делаем запрос на сервер
  // ответ записываем в хранилище Ридакса

  componentDidMount() {
    document.querySelector('input').focus();
  }

  render() {
    return (
      <div className="app mt-auto">
        <Formik
          initialValues={{ text: '' }}
          onSubmit={async (values, { resetForm }) => {
                 document.querySelector('input').focus();       
            if (values.text !== '') {
 
            const { addMessage } = this.props;
            const response = await axios.post(routes.channelMessagesPath(0), { data: { attributes: { text: values.text } } });

            const { data } = response.data;
            const message = { channelId: 0, id: data.id, text: data.attributes.text };
            // addMessage({ message });

            resetForm({}); // или values.text = '';

            }


          }}
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

export default connect(null, actionCreators)(Channels);
// export default Channels;
