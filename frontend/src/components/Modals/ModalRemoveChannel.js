import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import useInstance from '../../utils/axios';

const ModalRemoveChannel = ({ t, onHide, show }) => {
  const instance = useInstance();
  const handleSubmitDelete = () => {
    instance({ method: 'delete', url: `/channels/${show}` }).then(() => {
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
