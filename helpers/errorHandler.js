const errorHandler = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    // Jwt Authentication Error
    return res.status(401).json({ message: 'User is not authorized' });
  }
  if (err.name === 'ValidationError') {
    return res.status(401).json({ message: err });
  }
  return res.status(500).json(err);
};

module.exports = errorHandler;
