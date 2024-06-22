import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import instance from '../../utils/axios';

const ModalRemoveChannel = ({
  handleSubmitDelete, t, onHide, show,
}) => {
  console.log('');
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('interface.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('interface.submitDelete')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t('interface.cancel')}
        </Button>
        <Button variant="danger" type="submit" onClick={handleSubmitDelete}>
          {t('interface.deleteButton')}
        </Button>
      </Modal.Footer>
    </Modal>

  );
};

export default ModalRemoveChannel;
