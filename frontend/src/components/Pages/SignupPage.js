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
import { addUser } from '../../store/userSlice';
import instance from '../../utils/axios';

const SignupForm = () => {
  const { t } = useTranslation();
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('errors.invalidField'))
      .max(20, t('errors.invalidField'))
      .required(t('errors.fieldRequired')),
    password: Yup.string()
      .min(6, t('interface.invalidFieldShort'))
      .required(t('errors.fieldRequired')),
    confirm_password: Yup.string().required(t('errors.fieldRequired'))
      .oneOf([Yup.ref('password'), null], t('errors.passwordConfirmationError')),
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
      instance.post('/signup', values)
        .then((res) => {
          localStorage.setItem('user_data', JSON.stringify(res.data));
          dipatch(addUser(res.data));
          navigate(routes.chatPagePath());
        })
        .catch((err) => {
          console.dir(err);
          if (err.response?.status === 409) {
            setFieldError('username', t('errors.usernameExists'));
          }
          if (err.response?.status === 401) {
            setFieldError('username', t('interface.invalidCredentials'));
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
                      {t('interface.registration')}
                    </h1>
                    <Form.Group>
                      <FloatingLabel
                        // controlId="username"
                        label={t('interface.username')}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          id="username"
                          name="username"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                          placeholder={t('interface.username')}
                          isInvalid={!!formik.errors.username && !!formik.touched.username}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.username}
                        </Form.Control.Feedback>

                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                      <FloatingLabel
                        // controlId="password"
                        label={t('interface.password')}
                        className="mb-3"
                      >
                        <Form.Control
                          type="password"
                          id="password"
                          name="password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          onBlur={formik.handleBlur}
                          placeholder={t('interface.password')}
                          isInvalid={!!formik.errors.password && !!formik.touched.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.password}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                      <FloatingLabel
                        // controlId="confirm_password"
                        label={t('interface.confirmPassword')}
                        className="mb-3"
                      >
                        <Form.Control
                          type="password"
                          id="confirm_password"
                          name="confirm_password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.confirm_password}
                          placeholder={t('interface.confirmPassword')}
                          isInvalid={!!formik.errors.confirm_password && formik.touched.confirm_password}
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
                      {t('interface.registrationButton')}
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
