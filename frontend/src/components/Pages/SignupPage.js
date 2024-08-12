// eslint-disable  max-len
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
} from 'react-bootstrap';
import React from 'react';
import { useDispatch } from 'react-redux';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import routes from '../../routes';
import { useInstance } from '../../utils/axios';
import { logIn } from '../../store/userSlice';

const SignupForm = () => {
  const { t } = useTranslation();
  const instance = useInstance();
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('invalidField'))
      .max(20, t('invalidField'))
      .required(t('fieldRequired')),
    password: Yup.string()
      .min(6, t('invalidFieldShort'))
      .required(t('fieldRequired')),
    confirm_password: Yup.string().required(t('fieldRequired'))
      .oneOf([Yup.ref('password'), null], t('passwordConfirmationError')),
  });

  const navigate = useNavigate();
  const dipatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: SignupSchema,

    onSubmit: async (values, { setFieldError }) => {
      instance({ method: 'post', url: '/signup', data: values })
        .then((res) => {
          localStorage.setItem('user_data', JSON.stringify(res.data));
          dipatch(logIn(res.data));
          navigate(routes.chatPagePath());
        })
        .catch((err) => {
          console.dir(err);
          if (err.response?.status === 409) {
            setFieldError('username', t('usernameExists'));
          }
          if (err.response?.status === 401) {
            setFieldError('username', t('invalidCredentials'));
          }
        });
    },
  });

  return (

    <Stack className="h-100">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <img
                  className="rounded-circle"
                  src="https://frontend-chat-ru.hexlet.app/static/media/avatar_1.6084447160acc893a24d.jpg"
                  alt="Регистрация"
                />
                <Form onSubmit={formik.handleSubmit} className="mx-auto col-6">
                  <Stack gap={3}>
                    <h1 className="text-center">
                      {t('registration')}
                    </h1>
                    <Form.Group>
                      <FloatingLabel
                        controlId="username"
                        label={t('username')}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          id="username"
                          name="username"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                          placeholder={t('username')}
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
                        label={t('password')}
                        className="mb-3"
                      >
                        <Form.Control
                          type="password"
                          id="password"
                          name="password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          onBlur={formik.handleBlur}
                          placeholder={t('password')}
                          isInvalid={!!formik.errors.password && !!formik.touched.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.password}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                      <FloatingLabel
                        controlId="confirm_password"
                        label={t('confirmPassword')}
                        className="mb-3"
                      >
                        <Form.Control
                          type="password"
                          id="confirm_password"
                          name="confirm_password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.confirm_password}
                          placeholder={t('confirmPassword')}
                          isInvalid={
                          !!formik.errors.confirm_password && formik.touched.confirm_password
                        }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.confirm_password}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Button
                      className="w-100 btn btn-outline-primary"
                      type="submit"
                      name="general"
                      variant="outline-primary"
                    >
                      {t('makeRegistration')}
                    </Button>
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
