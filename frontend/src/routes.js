const apiPath = '/api/v1';

export default {
  ApiloginPath: () => [apiPath, 'login'].join('/'),
  loginPagePath: () => '/login',
  chatPagePath: () => '/',
  notFoundPage: () => '/404',
  registrationPagePath: () => '/signup',
};
