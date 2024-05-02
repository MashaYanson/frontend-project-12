import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  ButtonGroup,
  Col, Container, DropdownButton, ListGroup, Navbar, Row, Stack,
} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import instance from '../utils/axios';
import { updateChannels } from '../store/channelSlice';
import routes from '../routes';

const ChatPage = () => {
  const navigate = useNavigate();
  const dipatch = useDispatch();
  // const user = useSelector((state) => state.user);
  // const channels = useSelector((state) => state.channels.data);
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
  return (
    <Stack className="h-100">
      <Navbar className="bg-body-tertiary p-2">
        <Container>
          <Navbar.Brand href="#home">YANSON CHAT</Navbar.Brand>
        </Container>
      </Navbar>
      <div className="h-100 p-5">
        <div className="container overflow-hidden rounded shadow p-2 d-flex flex-column h-100">
          <div className="row h-100 bg-white flex-md-row">
            <Row>
              <Col sm={4} className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4"><b>Каналы</b></div>
                <ListGroup variant="flush">
                  <ListGroup.Item variant="light">
                    <ButtonGroup className="w-100">
                      <Button className="w-100 rounded-0 text-start" variant="light"># КАНАЛ 1</Button>
                      <DropdownButton as={ButtonGroup} variant="light" title="" id="bg-nested-dropdown" className="rounded-0">
                        <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
                      </DropdownButton>
                    </ButtonGroup>
                  </ListGroup.Item>
                  <ListGroup.Item variant="light">
                    <ButtonGroup className="w-100">
                      <Button className="w-100 rounded-0 text-start" variant="light"># КАНАЛ 2</Button>
                      <DropdownButton as={ButtonGroup} variant="light" title="" id="bg-nested-dropdown" className="rounded-0">
                        <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
                      </DropdownButton>
                    </ButtonGroup>
                  </ListGroup.Item>
                  <ListGroup.Item variant="light">
                    <ButtonGroup className="w-100">
                      <Button className="w-100 rounded-0 text-start" variant="light"># КАНАЛ 3</Button>
                      <DropdownButton as={ButtonGroup} variant="light" title="" id="bg-nested-dropdown" className="rounded-0">
                        <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
                      </DropdownButton>
                    </ButtonGroup>
                  </ListGroup.Item>

                </ListGroup>

              </Col>
              <Col sm={8} className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">что-то еще</Col>
            </Row>
          </div>
        </div>
      </div>
    </Stack>
  );
};

export default ChatPage;
