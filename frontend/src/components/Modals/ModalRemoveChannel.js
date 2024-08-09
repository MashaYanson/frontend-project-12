import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalRemoveChannel = ({
  handleSubmitDelete, t, onHide, show,
}) => (
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
      <Button className="btn btn-danger" variant="danger" type="submit" onClick={handleSubmitDelete}>
        {t('interface.deleteButton')}
      </Button>
    </Modal.Footer>
  </Modal>

);

export default ModalRemoveChannel;
