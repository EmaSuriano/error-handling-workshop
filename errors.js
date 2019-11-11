'use strict';

// Base error classes to extend from.
// Use assertions to catch programming errors.
// https://en.wikipedia.org/wiki/Assertion_%28software_development%29#Comparison_with_error_handling

const assert = require('assert');

class ApplicationError extends Error {
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

class OutgoingRequestError extends ApplicationError {
  get statusCode() {
    return 503;
  }
}

class DatabaseError extends ApplicationError {
  get statusCode() {
    return 504;
  }
}

class UserFacingError extends ApplicationError {
  get statusCode() {
    return 505;
  }
}

module.exports = {
  ApplicationError,
  DatabaseError,
  OutgoingRequestError,
  UserFacingError,
};
