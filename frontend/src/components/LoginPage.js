import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useState } from 'react';
import routes from '../routes';

const LoginForm = () => {
  const navigate = useNavigate();
  const [invalid, setInvalid] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      axios.post(routes.ApiloginPath(), values)
        .then((res) => {
          console.log(res);
          setInvalid(false);
          const { token } = res.data;
          localStorage.setItem('token', token);
          navigate(routes.chatPagePath());
        })
        .catch(() => {
          setInvalid(true);
        });
    },
  });

  // alert(JSON.stringify(values, null, 2));

  return (
    <Form onSubmit={formik.handleSubmit} className="col-md-5 mx-auto ">
      <Form.Group className="mb-3">
        <Form.Label>Ваш ник</Form.Label>
        <Form.Control
          type="text"
          id="username"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="Ваш ник"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Пароль"
        />
      </Form.Group>
      <Button className="mx-auto" type="submit" variant="outline-primary">Войти</Button>
      {invalid && (
      <Alert variant="danger" className="mb-3">
        qwe
      </Alert>
      )}
    </Form>
  );
};

export default LoginForm;
