module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'YMiMbaQl6I'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'YMiMbaQl6I'),
  },
});
