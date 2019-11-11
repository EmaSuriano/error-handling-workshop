const assert = require('assert');

export class ApplicationError extends Error {
  constructor(message, options = {}) {
    assert(typeof message === 'string');
    assert(typeof options === 'object');
    assert(options !== null);
    assert(!Object.prototype.hasOwnProperty.call(options, 'stack'));
    super(message);

    // Attach relevant information to the error instance
    // (e.g., the username).
    for (const [key, value] of Object.entries(options)) {
      this[key] = value;
    }
  }

  get name() {
    return this.constructor.name;
  }
}

export class OutgoingRequestError extends ApplicationError {
  get statusCode() {
    return 503;
  }
}

export class DatabaseError extends ApplicationError {
  get statusCode() {
    return 504;
  }
}

export class UserFacingError extends ApplicationError {
  get statusCode() {
    return 505;
  }
}
