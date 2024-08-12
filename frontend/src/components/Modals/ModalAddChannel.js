import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addChannel, setChannel } from '../../store/channelSlice';
import { useInstance } from '../../utils/axios';
import useFilter from '../../hooks/useFilter';

const ModalAddChannel = ({
  show, onHide, existingChannelNames, t,
}) => {
  const dispatch = useDispatch();
  const instance = useInstance();

  const filter = useFilter();

  const onSubmitChannel = (values, callBack) => {
    const newChannel = { name: filter.clean(values.name) };
    instance({ method: 'post', url: '/channels', data: newChannel }).then((res) => {
      dispatch(addChannel(res.data));
      dispatch(setChannel(res.data.id));
      console.log('toast');
      toast.success(t('addSuccess'), {
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
      onSubmitChannel(values, () => {
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
            {t('addChannel')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label htmlFor="name">
              {t('channelName')}
              :
            </label>
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
            {t('sendButton')}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalAddChannel;
