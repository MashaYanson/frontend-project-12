import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonGroup,
  Col, Container, DropdownButton, ListGroup, Navbar, Row, Stack,
} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import instance from '../utils/axios';
import { updateChannels } from '../store/channelSlice';
import routes from '../routes';
import ChatWindow from './ChatWindow';

const ChatPage = () => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const dipatch = useDispatch();
  // const user = useSelector((state) => state.user);
  const channels = useSelector((state) => state.channels.data);
  const selectedChannel = useMemo(() => channels[tab], [tab, channels]);

  useEffect(() => {
    const userString = localStorage.getItem('user_data');
    if (!userString) {
      navigate(routes.loginPagePath());
    } else {
      instance.get('/channels', {
      }).then((response) => {
        dipatch(updateChannels(response.data));
      });
    }
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
            <Row>
              <Col sm={4} className="col-4  border-end px-0 bg-light flex-column h-100 d-flex">
                <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4"><b>Каналы</b></div>
                <ListGroup variant="flush">
                  {channels.map((channel, index) => (
                    <ListGroup.Item variant="light" key={channel.id}>
                      <ButtonGroup className="w-100">
                        <Button className="w-100 rounded-0 text-start" variant="light" onClick={() => setTab(index)}>{channel.name}</Button>
                        {channel.removable ? (
                          <DropdownButton as={ButtonGroup} variant="light" title="" id="bg-nested-dropdown" className="rounded-0">
                            <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                          </DropdownButton>
                        ) : null }
                      </ButtonGroup>
                    </ListGroup.Item>
                  ))}

                </ListGroup>

              </Col>
              <Col sm={8} className="h-100">
                {selectedChannel && <ChatWindow channel={selectedChannel} />}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Stack>
  );
};

export default ChatPage;
