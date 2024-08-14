import React, {
  useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonGroup,
  Col, ListGroup,
} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import useInstance from '../../utils/axios';
import { setChannel, updateChannels } from '../../store/channelSlice';
import ChatWindow from '../ChatWindow';
import { addAllMessages } from '../../store/messageSlice';
import AddButton from '../Buttons/AddButton';
import ModalAddChannel from '../Modals/ModalAddChannel';
import ModalRemoveChannel from '../Modals/ModalRemoveChannel';
import ModalChangeChannelName from '../Modals/ModalChangeChannelName';
import routes from '../../routes';

const ChatPage = () => {
  const { t } = useTranslation();
  const instance = useInstance();
  const channelId = useSelector((state) => state.channels.channelId);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalChange, setShowModalChange] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseModalChange = () => setShowModalChange(false);
  const handleCloseDeleteModal = () => setShowModalDelete(false);
  const dispatch = useDispatch();
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
    setShowModalChange(id);
  };

  useEffect(() => {
    instance({ method: 'get', url: routes.api.channelsPath() }).then((response) => {
      dispatch(updateChannels(response.data));
    });
    instance({ method: 'get', url: routes.api.messagesPath() }).then((response) => {
      dispatch(addAllMessages(response.data));
    });
    return () => { console.log('return'); };
  }, []);

  return (
    <div className="h-100 p-5">
      <div className="container overflow-hidden rounded shadow d-flex flex-column h-100">
        <div className="row h-100 bg-white flex-md-row">
          <Col sm={4} className="col-4  border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>{t('channels')}</b>
              <AddButton
                onClick={handleAddButton}
              />
            </div>
            <ListGroup variant="flush">
              {channels.map((channel) => (
                <ListGroup.Item
                  variant="light"
                  key={channel.id}
                >
                  <ButtonGroup className="w-100">
                    <Button
                      className="w-100 rounded-0 text-start text-truncate"
                      variant={channel.id === channelId ? 'secondary' : 'light'}
                      name={filter.clean(channel.name)}
                      onClick={() => dispatch(setChannel(channel.id))}
                    >
                      {'# '}
                      {filter.clean(channel.name)}
                    </Button>

                    {channel.removable ? (
                      <Dropdown>
                        <Dropdown.Toggle
                          split
                          className="class=flex-grow-0 dropdown-toggle dropdown-toggle-split btn btn-secondary"
                          variant={channel.id === channelId ? 'secondary' : 'light'}
                          style={{ borderRadius: '0px 8px 8px 0px' }}
                        >
                          <span className="visually-hidden">{t('make')}</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="1" onClick={() => handleDeleteChannelButton(channel.id)}>{t('delete')}</Dropdown.Item>
                          <Dropdown.Item eventKey="1" onClick={() => handleChangeChannelName(channel.id)}>{t('rename')}</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : null }
                  </ButtonGroup>
                </ListGroup.Item>
              ))}

            </ListGroup>

          </Col>
          <Col
            sm={8}
            className="col p-0 h-100"
          >
            {selectedChannel && <ChatWindow channel={selectedChannel} />}
          </Col>
        </div>
        <ModalAddChannel
          t={t}
          show={showModal}
          onHide={handleCloseModal}
          existingChannelNames={existingNames}
        />
        <ModalRemoveChannel
          t={t}
          show={showModalDelete}
          onHide={handleCloseDeleteModal}
        />
        <ModalChangeChannelName
          t={t}
          show={showModalChange}
          onHide={handleCloseModalChange}
          existingChannelNames={existingNames}
        />
      </div>
    </div>
  );
};

export default ChatPage;
