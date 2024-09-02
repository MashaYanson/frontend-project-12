import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectMessagesByChannelId } from '../store/messageSlice';
import NewMessageForm from './Pages/NewMessageForm';

const ChatWindow = ({ channel }) => {
  const { t } = useTranslation();
  const { name } = channel;
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
        <NewMessageForm channel={channel} />
      </div>
    </div>
  );
};

export default ChatWindow;
