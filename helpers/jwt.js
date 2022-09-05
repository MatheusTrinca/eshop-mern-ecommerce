const { expressjwt: jwt } = require('express-jwt');

const authJwt = () => {
  const secret = process.env.SECRET;
  return jwt({ secret, algorithms: ['HS256'] });
};

module.exports = authJwt;
