import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonGroup,
  Col, DropdownButton, ListGroup,
} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import instance from '../../utils/axios';
import {
  addChannel, editChannel, removeChannel, setChannel, updateChannels,
} from '../../store/channelSlice';
import ChatWindow from '../ChatWindow';
import socketIo from '../../utils/socket';
import { addMessage, deleteChannelMessages } from '../../store/messageSlice';
import AddButton from '../Buttons/AddButton';
import ModalAddChannel from '../Modals/ModalAddChannel';
import ModalRemoveChannel from '../Modals/ModalRemoveChannel';
import ModalChangeChannelName from '../Modals/ModalChangeChannelName';

filter.loadDictionary('ru');

const ChatPage = () => {
  const { t, i18n } = useTranslation();
  const channelId = useSelector((state) => state.channels.channelId);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalChange, setShowModalChange] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseModalChange = () => setShowModalChange(false);
  const handleCloseDeleteModal = () => setShowModalDelete(false);
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);
  const channels = useSelector((state) => state.channels.data);
  const existingNames = Object.values(channels.map((channel) => channel.name));
  // eslint-disable-next-line max-len
  const selectedChannel = useMemo(() => channels.find((item) => item.id === channelId), [channelId, channels]);
  const handleAddButton = () => {
    setShowModal(true);
  };
  const handleDeleteChannelButton = (id) => {
    setShowModalDelete(id);
  };
  const handleChangeChannelName = (id) => {
    console.log(id);
    setShowModalChange(id);
  };
  const onSubmitChannel = (values, callBack) => {
    const newChannel = { name: values.name };
    instance.post('/channels', newChannel).then((res) => {
      dispatch(addChannel(res.data));
      dispatch(setChannel(res.data.id));
      console.log('toast');
      toast.success(t('interface.addSuccess'), {
        position: 'top-right',
      });
      callBack();
    });
  };
  const onSubmitChangeChannel = (values, callBack) => {
    const editedChannel = { name: values.name };
    instance.patch(`/channels/${values.id}`, editedChannel).then((res) => {
      dispatch(editChannel(res.data));
      toast.success(t('interface.renameSuccess'), {
        position: 'top-right',
      });
      callBack();
    });
  };

  const handleSubmitDelete = () => {
    instance.delete(`/channels/${showModalChange}`).then(() => {
      handleCloseDeleteModal();
    });
  };
  useEffect(() => {
    instance.get('/channels', {
    }).then((response) => {
      dispatch(updateChannels(response.data));
    });

    // получение сообщений
    // новое сообщение
    socketIo.on('newMessage', (payload) => {
      console.log(payload);
      dispatch(addMessage({ channelId: payload.channelId, message: { ...payload } }));
    });
    socketIo.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
    });
    socketIo.on('removeChannel', (payload) => {
      console.log(payload); // { id: 6 };
      dispatch(removeChannel(payload.id));
      dispatch(deleteChannelMessages(payload.id));
    });
    socketIo.on('renameChannel', (payload) => {
      dispatch(editChannel(payload));
      console.log(payload); // { id: 7, name: "new name channel", removable: true }
    });
  }, []);
  useEffect(() => {
    console.log(channels);
  }, [channels]);
  return (
    <div className="h-100 p-5">
      <div className="container overflow-hidden rounded shadow d-flex flex-column h-100">
        <div className="row h-100 bg-white flex-md-row">
          <Col sm={4} className="col-4  border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>{t('interface.channels')}</b>
              <AddButton onClick={handleAddButton} />
            </div>
            <ListGroup variant="flush">
              {channels.map((channel) => (
                <ListGroup.Item variant="light" key={channel.id}>
                  <ButtonGroup className="w-100">
                    <Button
                      className="w-100 rounded-0 text-start"
                      variant="light"
                      onClick={() => dispatch(setChannel(channel.id))}
                    >
                      {'# '}
                      {filter.clean(channel.name)}
                    </Button>
                    {channel.removable ? (
                      <DropdownButton
                        as={ButtonGroup}
                        variant="light"
                        title=""
                        id="bg-nested-dropdown"
                        className="rounded-0"
                      >
                        <Dropdown.Item
                          onClick={() => handleDeleteChannelButton(channel.id)}
                          eventKey="1"
                        >
                          {t('interface.deleteButton')}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleChangeChannelName(channel.id)}
                          eventKey="1"
                        >
                          {t('interface.renameButton')}
                        </Dropdown.Item>
                      </DropdownButton>
                    ) : null }
                  </ButtonGroup>
                </ListGroup.Item>
              ))}

            </ListGroup>

          </Col>
          <Col sm={8} className="col p-0 h-100">
            {selectedChannel && <ChatWindow channel={selectedChannel} />}
          </Col>
        </div>
        <ModalAddChannel
          t={t}
          show={showModal}
          onHide={handleCloseModal}
          existingChannelNames={existingNames}
          onSubmitChannel={onSubmitChannel}
        />
        <ModalRemoveChannel
          t={t}
          show={showModalDelete}
          onHide={handleCloseDeleteModal}
          handleSubmitDelete={handleSubmitDelete}
        />
        <ModalChangeChannelName
          t={t}
          show={showModalChange}
          onHide={handleCloseModalChange}
          existingChannelNames={existingNames}
          onSubmitChannel={onSubmitChangeChannel}
        />
      </div>
    </div>
  );
};

export default ChatPage;