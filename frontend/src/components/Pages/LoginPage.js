import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import routes from '../../routes';
import { logIn } from '../../store/userSlice';
import { useInstance } from '../../utils/axios';

const LoginForm = () => {
  const validationLoginSchema = Yup.object().shape({
    username: Yup.string()
      .required('Обязальное поле'),
    password: Yup.string()
      .required('Обязальное поле'),
  });
  const navigate = useNavigate();
  const { t } = useTranslation();
  const instance = useInstance();
  const [invalid, setInvalid] = useState(false);
  const dipatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationLoginSchema,

    onSubmit: async (values, { setFieldError }) => {
      instance('post', '/login', values)
        .then((res) => {
          setInvalid(false);
          localStorage.setItem('user_data', JSON.stringify(res.data));
          dipatch(logIn(res.data));
          navigate(routes.chatPagePath());
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setFieldError('username', t('interface.invalidCredentials'));
          }
          setInvalid(true);
        });
    },
  });

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row ">
            <div className="col-20 col-md-6 d-flex justify-content-center">
              <img
                alt="Страница не найдена"
                className="img-fluid"
                src="https://frontend-chat-ru.hexlet.app/static/media/404.38677c8fa96b7e2b6537040f39020684.svg"
              />
            </div>
            <Form onSubmit={formik.handleSubmit} className="col-md-5 mx-auto ">
              <h1 className="text-center mb-3">Войти</h1>
              <Form.Group className="mb-3">
                <FloatingLabel
                  controlId="username"
                  className="mb-3"
                  label={t('interface.nickName')}
                >
                  <Form.Control
                    type="text"
                    id="username"
                    name="username"
                    label={t('interface.placholderNickname')}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder={t('interface.placholderNickname')}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3">
                <FloatingLabel
                  controlId="password"
                  className="mb-3"
                  label={t('interface.password')}
                >
                  <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder={t('interface.password')}
                  />
                </FloatingLabel>
              </Form.Group>
              <div className="mb-2">
                <Button
                  className="mx-auto w-100 mb-3 btn btn-outline-primary"
                  type="submit"
                  variant="outline-primary"
                >
                  {t('interface.logInButton')}
                </Button>
                {invalid && (
                <Alert variant="danger" className="mb-3">
                  {t('interface.invalidCredentials')}
                </Alert>
                )}
              </div>
            </Form>
            <div className="card-footer p-4" style={{ marginBottom: '-15px' }}>
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <Link to="/signup">Регистрация</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default LoginForm;
