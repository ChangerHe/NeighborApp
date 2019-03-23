const timeLog = (req, res, next) => {
  console.log(`METHOD: ${req.method}, URL: ${req.originalUrl}`);
  next();
}

module.exports = timeLog