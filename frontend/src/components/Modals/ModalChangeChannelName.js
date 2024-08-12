import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { editChannel } from '../../store/channelSlice';
import useInstance from '../../utils/axios';

const ModalChangeChannelName = ({
  show, onHide, existingChannelNames, t,
}) => {
  const dispatch = useDispatch();
  const instance = useInstance();

  const onSubmitChangeChannel = (values, callBack) => {
    const editedChannel = { name: values.name };
    instance({ method: 'patch', url: `/channels/${values.id}`, data: editedChannel }).then((res) => {
      dispatch(editChannel(res.data));
      toast.success(t('renameSuccess'), {
        position: 'top-right',
      });
      callBack();
    });
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

    onSubmit: (values) => {
      onSubmitChangeChannel({ ...values, id: show }, () => {
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
            {t('renemeChannel')}
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
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="invalid-feedback">{formik.errors.name}</div>
            ) : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            {t('cancel')}
          </Button>
          <Button variant="primary" type="submit">
            {t('send')}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalChangeChannelName;
