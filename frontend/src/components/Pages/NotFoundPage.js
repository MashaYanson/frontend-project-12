import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img
        alt={t('notFound')}
        className="img-fluid h-25"
        src="https://frontend-chat-ru.hexlet.app/static/media/404.38677c8fa96b7e2b6537040f39020684.svg"
      />
      <h1>{t('notFound')}</h1>
      <p>
        {t('directTo')}
        <a href="/">{t('mainPage')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
