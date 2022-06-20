class NotFound extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name;
    this.status = 404;
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name;
    this.status = 500;
  }
}

class BadRequest extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name;
    this.status = 400;
  }
}

class Conflict extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name;
    this.status = 409;
  }
}

class Forbidden extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name;
    this.status = 403;
  }
}

class Unauthorized extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name;
    this.status = 401;
  }
}

module.exports = {
  NotFound,
  InternalServerError,
  BadRequest,
  Conflict,
  Unauthorized,
  Forbidden
}
