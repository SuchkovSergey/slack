import React, { useEffect, useRef } from 'react';
// import _ from 'lodash';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import routes from '../../routes';

const generateOnSubmit = ({ onHide }) => async (values) => {
  if (values.body !== '') {
    await axios.post(routes.channelsPath(), {
      data: {
        attributes: {
          name: values.body,
        },
      },
    });
  }
  onHide();
};

export default (props) => {
  const { onHide } = props;
  const form = useFormik({ onSubmit: generateOnSubmit(props), initialValues: { body: '' } });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [null]);

  return (
    <Modal.Dialog size="xl" centered aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Add new Channel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={form.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              placeholder="write new channel title here"

              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.body}
              name="body"
            />
          </FormGroup>
          <input type="submit" className="btn btn-primary" value="submit" />
        </form>
      </Modal.Body>
    </Modal.Dialog>
  );
};
// END
// data-testid="input-body"
//
