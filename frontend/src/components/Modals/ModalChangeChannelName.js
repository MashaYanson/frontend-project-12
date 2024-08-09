import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ModalChangeChannelName = ({
  show, onHide, existingChannelNames, onSubmitChannel, t,
}) => {
  const AddChannelSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, t('errors.invalidField'))
      .max(20, t('errors.invalidField'))
      .test('unique', t('errors.unique'), (value) => !existingChannelNames.includes(value)),

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
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {t('interface.renemeChannel')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label className="visually-hidden" htmlFor="name">{t('interface.channelName')}</label>
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
