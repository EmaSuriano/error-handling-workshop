'use strict';

// Base error classes to extend from.
// Use assertions to catch programming errors.
// https://en.wikipedia.org/wiki/Assertion_%28software_development%29#Comparison_with_error_handling

class ApplicationError extends Error {
  constructor(message, options = {}) {
    assert(typeof message === 'string');
    assert(typeof options === 'object');
    assert(options !== null);
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

class OutgoingRequestError extends ApplicationError {}

class DatabaseError extends ApplicationError {}

class UserFacingError extends ApplicationError {}

module.exports = {
  ApplicationError,
  DatabaseError,
  OutgoingRequestError,
  UserFacingError
};
