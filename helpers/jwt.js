const { expressjwt: jwt } = require('express-jwt');

const authJwt = () => {
  const secret = process.env.SECRET;
  const api = process.env.API_URL;
  return jwt({
    secret,
    algorithms: ['HS256'],
    isRevoked: isRevokedCallback,
  }).unless({
    path: [
      {
        url: /\/api\/v1\/products(.*)/,
        methods: ['GET', 'OPTIONS'],
      },
      {
        url: /\/api\/v1\/categories(.*)/,
        methods: ['GET', 'OPTIONS'],
      },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
};

const isRevokedCallback = async (req, token) => {
  if (!token.payload.isAdmin) {
    return true;
  }
};

module.exports = authJwt;
