import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import filter from 'leo-profanity';
import useInstance from '../utils/axios';
import routes from '../routes';
import { selectMessagesByChannelId } from '../store/messageSlice';

const ChatWindow = ({ channel }) => {
  const { t } = useTranslation();
  const { name } = channel;
  const instance = useInstance();
  const userName = useSelector((state) => state.user.userData.username);
  const messages = useSelector((state) => selectMessagesByChannelId(state, channel.id));

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <b>
          #
          {name}
        </b>
        <div>
          {t('messagesCounter.count', { count: messages.length })}
        </div>
      </div>
      <div className="chat-messages overflow-auto px-5">
        {messages.map((msg) => (
          <div key={msg.id}>
            <b>{msg.username}</b>
            :
            {' '}
            {msg.body}
          </div>
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <Formik
          initialValues={{ message: '' }}
          onSubmit={async (values, { resetForm }) => {
            const newMessage = {
              body: filter.clean(values.message),
              channelId: channel.id,
              username: userName,
            };
            try {
              await instance({
                method: 'post',
                url: routes.api.messagesPath(),
                data: newMessage,
              });
              resetForm();
            } catch (error) {
              console.error('Error sending message:', error);
            }
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form noValidate="" className="py-1 border rounded-2" onSubmit={handleSubmit}>
              <div className="input-group has-validation">
                <Field
                  name="message"
                  aria-label={t('newMessage')}
                  placeholder={t('send')}
                  className="border-0 p-0 ps-2 form-control"
                />
                <button type="submit" disabled={isSubmitting} className="btn btn-group-vertical">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="20"
                    height="20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                    />
                  </svg>
                  <span className="visually-hidden">{t('send')}</span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChatWindow;
