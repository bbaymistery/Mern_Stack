const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mongo db error (mesela getProduct 23424 id yazsak Normalda castEror bla bla nese gele Ordan yola cixarag oz own erroru olusduruq)
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    status: err.statusCode,
    // stack: err.stack,//dosyalarn harda oldugunu deeyir
  });
};
