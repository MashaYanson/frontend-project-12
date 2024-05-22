const getMessageCountText = (count) => {
  const cases = [2, 0, 1, 1, 1, 2];
  const titles = ['сообщение', 'сообщения', 'сообщений'];
  return titles[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)]];
};
export default getMessageCountText;
