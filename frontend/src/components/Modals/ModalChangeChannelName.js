import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import useInstance from '../../utils/axios';
import routes from '../../routes';

const ModalChangeChannelName = ({
  show, onHide, existingChannelNames,
}) => {
  const instance = useInstance();
  const { t } = useTranslation();

  const onSubmitChangeChannel = async (values) => {
    const editedChannel = { name: values.name };
    try {
      await instance({
        method: 'patch',
        url: routes.api.channelPath(values.id),
        data: editedChannel,
      });
      toast.success(t('renameSuccess'), {
        position: 'top-right',
      });
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const AddChannelSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, t('invalidField'))
      .max(20, t('invalidField'))
      .test('unique', t('unique'), (value) => !existingChannelNames.includes(value)),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: AddChannelSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await onSubmitChangeChannel({ ...values, id: show });
        resetForm();
        onHide();
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Modal show={show} onHide={onHide}>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {t('renameChannel')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label className="visually-hidden" htmlFor="name">{t('channelName')}</label>
            <input
              name="name"
              id="name"
              className={`mb-2 form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              value={formik.values.name}
              disabled={formik.isSubmitting}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="invalid-feedback">{formik.errors.name}</div>
            ) : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={formik.isSubmitting}>
            {t('cancel')}
          </Button>
          <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
            {t('send')}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalChangeChannelName;
