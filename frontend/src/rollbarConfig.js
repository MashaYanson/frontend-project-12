const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  code_version: '0.13.7',
};
export default rollbarConfig;
