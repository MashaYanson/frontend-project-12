import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import instance from '../utils/axios';

const ModalRemoveChannel = ({ show, onHide, t }) => {
  // const dispatch = useDispatch();
  //
  // const handleSubmitDelete = async () => {
  //     try {
  //         await instance.delete(`/channels/${channelId}`);
  //         dispatch(removeChannel(channelId));
  //         onHide();
  //     } catch (error) {
  //         console.error('Failed to delete the channel:', error);
  //     }
  // };
  const handleSubmitDelete = () => {
    instance.delete(`/channels/${show}`).then(() => {
      onHide();
    });
  };
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

  // <Modal show={show} onHide={onHide}>
  //   <div className="modal-dialog modal-dialog-centered">
  //     <div className="modal-content">
  //       <div className="modal-header">
  //         <div className="modal-title h4">Удалить канал</div>
  // eslint-disable-next-line max-len
  //         <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" />
  //       </div>
  //       <div className="modal-body">
  //         <p className="lead">Уверены?</p>
  //         <div className="d-flex justify-content-end">
  //           <button type="button" className="me-2 btn btn-secondary">Отменить</button>
  //           <button type="button" className="btn btn-danger">Удалить</button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </Modal>
  );
};

export default ModalRemoveChannel;
