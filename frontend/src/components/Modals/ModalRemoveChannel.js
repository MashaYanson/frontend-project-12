import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import useInstance from '../../utils/axios';
import routes from '../../routes';

const ModalRemoveChannel = ({ onHide, show }) => {
  const instance = useInstance();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitDelete = async () => {
    setIsSubmitting(true);
    try {
      await instance({ method: 'delete', url: routes.api.channelPath(show) });
      toast.success(t('deleteSuccess'), {
        position: 'top-right',
      });
      onHide();
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
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
        <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
          {t('cancel')}
        </Button>
        <Button
          className="btn btn-danger"
          variant="danger"
          type="submit"
          onClick={handleSubmitDelete}
          disabled={isSubmitting}
        >
          {t('delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRemoveChannel;
