import React from 'react';

const NotFoundPage = () => (
  <div className="text-center">
    <img
      alt="Страница не найдена"
      className="img-fluid h-25"
      src="https://frontend-chat-ru.hexlet.app/static/media/404.38677c8fa96b7e2b6537040f39020684.svg"
    />
    <h1>Страница не найдена</h1>
    <p>
      {'Но вы можете перейти '}
      <a href="/">на главную страницу</a>
    </p>
  </div>
);

export default NotFoundPage;
