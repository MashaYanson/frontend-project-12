// eslint-disable  max-len
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  Container, Navbar, Stack,
} from 'react-bootstrap';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import * as Yup from 'yup';
import routes from '../routes';
import { addUser } from '../store/userSlice';
import instance from '../utils/axios';

const SignupForm = () => {
  const [namesInUse, setNamesInUse] = React.useState([]);
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязальное поле'),
    password: Yup.string()
      .min(6, 'Не менее 6 символов')
      .required('Обязальное поле'),
    confirm_password: Yup.string().required('Обязальное поле')
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
  });

  const navigate = useNavigate();
  const [invalid, setInvalid] = useState(false);
  const dipatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: SignupSchema,

    onSubmit: async (values, { setFieldError }) => {
      instance.post('/signup', values)
        .then((res) => {
          console.log(res);
          setInvalid(false);
          localStorage.setItem('user_data', JSON.stringify(res.data));
          dipatch(addUser(res.data));
          navigate(routes.chatPagePath());
        })
        .catch((err) => {
          console.dir(err);
          if (err.response.status === 409) {
            console.log('erroe');
            setFieldError('username', 'такой пользователь уже существует');
          }
        });
    },
  });

  return (

    <Stack className="h-100">
      <Navbar className="bg-body-tertiary p-2 shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <Container>
          <Navbar.Brand href="#home">Yanson Chat</Navbar.Brand>

        </Container>
      </Navbar>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-6 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <Form onSubmit={formik.handleSubmit} className="mx-auto col-6">
                  <Stack gap={3}>
                    <h1 className="text-center">
                      Регистрация
                    </h1>
                    <Form.Group>
                      <FloatingLabel
                        controlId="username"
                        label="Имя пользователя"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          id="username"
                          name="username"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                          placeholder="Имя пользователя"
                          isInvalid={!!formik.errors.username && !!formik.touched.username}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.username}
                        </Form.Control.Feedback>

                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                      <FloatingLabel
                        controlId="password"
                        label="Пароль"
                        className="mb-3"
                      >
                        <Form.Control
                          type="password"
                          id="password"
                          name="password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          onBlur={formik.handleBlur}
                          placeholder="Пароль"
                          isInvalid={!!formik.errors.password && !!formik.touched.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.password}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                      <FloatingLabel
                        controlId="confirm-password"
                        label="Подтвердите пароль"
                        className="mb-3"
                      >
                        <Form.Control
                          type="password"
                          id="confirm_password"
                          name="confirm_password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.confirm_password}
                          placeholder="Подтвердите пароль"
                          isInvalid={!!formik.errors.confirm_password && formik.touched.confirm_password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.confirm_password}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Button className="mx-auto" type="submit" variant="outline-primary">Зарегистрироваться</Button>
                  </Stack>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Stack>
  );
};

export default SignupForm;
