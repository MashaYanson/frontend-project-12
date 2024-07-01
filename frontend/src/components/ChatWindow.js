import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';

import instance from '../utils/axios';
import { addAllMessages } from '../store/messageSlice';
import getMessageCountText from '../utils/getMessageCountText';
import SubmitButton from './Buttons/SubmitButton';

filter.loadDictionary('ru');
const ChatWindow = ({ channel }) => {
  const { name } = channel;
  const { t, i18n } = useTranslation();
  const [message, setMessage] = useState('');
  const userName = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.data[channel.id] || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = { body: message, channelId: channel.id, username: userName };
    instance.post('/messages', newMessage).then(() => {
      setMessage('');
    });
  };

  useEffect(() => {
    instance.get('/messages').then((response) => {
      console.log(response.data);
      dispatch(addAllMessages({ channelId: channel.id, messages: response.data }));
    });
  }, []);
  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <b>
          {'# '}
          {name}
        </b>
        <div>
          {messages.length}
          {' '}
          {getMessageCountText(messages.length)}
        </div>
      </div>
      <div className="chat-messages overflow-auto px-5">
        {messages.map((msg) => (
          <div key={msg.id}>
            <b>{msg.username}</b>
            :
            {' '}
            {filter.clean(msg.body)}
          </div>
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <form noValidate="" className="py-1 border rounded-2">
          <div className="input-group has-validation">
            <input
              name="body"
              aria-label="Новое сообщение"
              placeholder={t('interface.placeholderEnterMessage')}
              className="border-0 p-0 ps-2 form-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <SubmitButton
              onClick={handleSubmit}
              messageLenght={message.length}
              t={t}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
