import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import useInstance from '../../utils/axios';
import { removeChannel } from '../../store/channelSlice';
import routes from '../../routes';
import { deleteChannelMessages } from '../../store/messageSlice';

const ModalRemoveChannel = ({ onHide, show }) => {
  const instance = useInstance();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleSubmitDelete = () => {
    instance({ method: 'delete', url: routes.api.channelPath(show) }).then((res) => {
      console.log(res.data.id);
      dispatch(removeChannel(res.data.id));
      dispatch(deleteChannelMessages(res.data.id));
      toast.success(t('deleteSuccess'), {
        position: 'top-right',
      });
      onHide();
    });
  };
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('submitDelete')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t('cancel')}
        </Button>
        <Button className="btn btn-danger" variant="danger" type="submit" onClick={handleSubmitDelete}>
          {t('delete')}
        </Button>
      </Modal.Footer>
    </Modal>

  );
};

export default ModalRemoveChannel;
