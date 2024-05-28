import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonGroup,
  Col, Container, DropdownButton, ListGroup, Navbar, Stack,
} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import instance from '../utils/axios';
import {
  addChannel, removeChannel, setChannel, updateChannels,
} from '../store/channelSlice';
import routes from '../routes';
import ChatWindow from './ChatWindow';
import socketIo from '../utils/socket';
import { addMessage, deleteChannelMessages } from '../store/messageSlice';
import AddButton from './AddButton';
import ModalAddChannel from './ModalAddChannel';
import ModalRemoveChannel from './ModalRemoveChannel';

const ChatPage = () => {
  const channelId = useSelector((state) => state.channels.channelId);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseDeleteModal = () => setShowModalDelete(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);
  const channels = useSelector((state) => state.channels.data);
  // eslint-disable-next-line max-len
  const selectedChannel = useMemo(() => channels.find((item) => item.id === channelId), [channelId, channels]);
  const handleAddButton = () => {
    setShowModal(true);
  };
  const handleDeleteChannelButton = (id) => {
    setShowModalDelete(id);
  };
  const onSubmitChannel = (values, callBack) => {
    const newChannel = { name: values.name };
    instance.post('/channels', newChannel).then((res) => {
      dispatch(addChannel(res.data));
      dispatch(setChannel(res.data.id));
      callBack();
      // dispatch(setChannel(index));
    });
  };
  useEffect(() => {
    console.log('useEffect');
    const userString = localStorage.getItem('user_data');
    if (!userString) {
      navigate(routes.loginPagePath());
    } else {
      instance.get('/channels', {
      }).then((response) => {
        dispatch(updateChannels(response.data));
      });
    }
    // получение сообщений
    // новое сообщение
    socketIo.on('newMessage', (payload) => {
      dispatch(addMessage({ channelId: payload.channelId, message: payload }));
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
      console.log(payload); // { id: 7, name: "new name channel", removable: true }
    });
  }, []);
  useEffect(() => {
    console.log(channels);
  }, [channels]);
  return (
    <Stack className="h-100">
      <Navbar className="bg-body-tertiary p-2 shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <Container>
          <Navbar.Brand href="#home">Yanson Chat</Navbar.Brand>
          <button type="button" className="btn btn-primary">Выйти</button>

        </Container>
      </Navbar>
      <div className="h-100 p-5">
        <div className="container overflow-hidden rounded shadow p-2 d-flex flex-column h-100">
          <div className="row h-100 bg-white flex-md-row">
            <Col sm={4} className="col-4  border-end px-0 bg-light flex-column h-100 d-flex">
              <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <AddButton onClick={handleAddButton} />
              </div>
              <ListGroup variant="flush">
                {channels.map((channel) => (
                  <ListGroup.Item variant="light" key={channel.id}>
                    <ButtonGroup className="w-100">
                      <Button className="w-100 rounded-0 text-start" variant="light" onClick={() => dispatch(setChannel(channel.id))}>
                        {'# '}
                        {channel.name}
                      </Button>
                      {channel.removable ? (
                        <DropdownButton as={ButtonGroup} variant="light" title="" id="bg-nested-dropdown" className="rounded-0">
                          <Dropdown.Item onClick={() => handleDeleteChannelButton(channel.id)} eventKey="1">Удалить</Dropdown.Item>
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
            show={showModal}
            onHide={handleCloseModal}
            existingChannelNames={channels}
            onSubmitChannel={onSubmitChannel}
          />
          <ModalRemoveChannel
            show={showModalDelete}
            onHide={handleCloseDeleteModal}
          />
        </div>
      </div>
    </Stack>
  );
};

export default ChatPage;
