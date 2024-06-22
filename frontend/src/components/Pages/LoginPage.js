import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import routes from '../../routes';
import { addUser } from '../../store/userSlice';
import instance from '../../utils/axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [invalid, setInvalid] = useState(false);
  const dipatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      instance.post('/login', values)
        .then((res) => {
          console.log(res);
          setInvalid(false);
          localStorage.setItem('user_data', JSON.stringify(res.data));
          dipatch(addUser(res.data));
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
        <Form.Label>{t('interface.nickName')}</Form.Label>
        <Form.Control
          type="text"
          id="username"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder={t('interface.placholderNickname')}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>{t('interface.password')}</Form.Label>
        <Form.Control
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder={t('interface.password')}
        />
      </Form.Group>
      <Button className="mx-auto" type="submit" variant="outline-primary">{t('interface.logInButton')}</Button>
      {invalid && (
      <Alert variant="danger" className="mb-3">
          {t('errors.usernameExists')}
      </Alert>
      )}
    </Form>
  );
};

export default LoginForm;
