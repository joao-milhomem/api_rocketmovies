class AppError {
  message;
  statusCode;

  constructor(message, statusCode = 100) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError
