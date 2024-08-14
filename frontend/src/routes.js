export default {
  loginPagePath: () => '/login',
  chatPagePath: () => '/',
  signupPagePath: () => '/signup',
  api: {
    loginPath: () => '/login',
    channelsPath: () => '/channels',
    messagesPath: () => '/messages',
    channelPath: (id) => `/channels/${id}`,
    signUpPath: () => '/signup',
  },
};
