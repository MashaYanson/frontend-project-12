import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ModalChangeChannelName = ({
  show, onHide, existingChannelNames, onSubmitChannel, t,
}) => {
  const AddChannelSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .test('unique', 'Имя канала должно быть уникальным', (value) => !existingChannelNames.includes(value)),

  });
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: AddChannelSchema,

    onSubmit: (values) => {
      onSubmitChannel({ ...values, id: show }, () => {
        formik.handleReset();
        onHide();
      });
    },
  });
  return (
    <Modal show={show} onHide={onHide}>
      <form className="" onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            Переименовать канал
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="name">Имя:</label>
            <input
              name="name"
              id="name"
              className={`mb-2 form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="invalid-feedback">{formik.errors.name}</div>
            ) : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            {t('interface.cancel')}
          </Button>
          <Button variant="primary" type="submit">
            {t('interface.sendButton')}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

// const [show, setShow] = useState(false);

// const handleClose = () => setShow(false);
// const handleShow = () => setShow(true);

export default ModalChangeChannelName;
