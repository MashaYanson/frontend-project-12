import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';

// import { useState } from 'react';

const ModalAddChannel = ({ show, onHide }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Modal show={show} onHide={onHide}>
      <form className="" onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input
              name="name"
              id="name"
              className="mb-2 form-control"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <div className="invalid-feedback" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Отменить
          </Button>
          <Button variant="primary" type="submit">
            Отправить
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

// const [show, setShow] = useState(false);

// const handleClose = () => setShow(false);
// const handleShow = () => setShow(true);

export default ModalAddChannel;
