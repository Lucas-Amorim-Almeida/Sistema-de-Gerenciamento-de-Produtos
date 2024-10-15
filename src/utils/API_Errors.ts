export class ApiError extends Error {
  public readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
/**   --500--    **/
export class InternalServerError extends ApiError {
  constructor(message: string) {
    super(message, 500);
  }
}
export class NotImplementedError extends ApiError {
  constructor(message: string) {
    super(message, 501);
  }
}
export class BadGatewayError extends ApiError {
  constructor(message: string) {
    super(message, 502);
  }
}
export class ServiceUnavailableError extends ApiError {
  constructor(message: string) {
    super(message, 503);
  }
}
export class GatewayTimeoutError extends ApiError {
  constructor(message: string) {
    super(message, 504);
  }
}
export class HTTPVersionNotSupportedError extends ApiError {
  constructor(message: string) {
    super(message, 505);
  }
}
export class VariantAlsoNegotiatesError extends ApiError {
  constructor(message: string) {
    super(message, 506);
  }
}
export class NotExtendedError extends ApiError {
  constructor(message: string) {
    super(message, 510);
  }
}
export class NetworkAuthenticationRequiredError extends ApiError {
  constructor(message: string) {
    super(message, 511);
  }
}

/**   --400--    **/
export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}
export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}
export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(message, 403);
  }
}
export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404);
  }
}
export class MethodNotAllowedError extends ApiError {
  constructor(message: string) {
    super(message, 405);
  }
}
export class NotAcceptableError extends ApiError {
  constructor(message: string) {
    super(message, 406);
  }
}
export class RequestTimeoutError extends ApiError {
  constructor(message: string) {
    super(message, 408);
  }
}
export class ConflictError extends ApiError {
  constructor(message: string) {
    super(message, 409);
  }
}
export class GoneError extends ApiError {
  constructor(message: string) {
    super(message, 410);
  }
}
export class LengthRequiredError extends ApiError {
  constructor(message: string) {
    super(message, 411);
  }
}
export class PreconditionFailedError extends ApiError {
  constructor(message: string) {
    super(message, 412);
  }
}
export class PayloadTooLargeError extends ApiError {
  constructor(message: string) {
    super(message, 413);
  }
}
export class URITooLongError extends ApiError {
  constructor(message: string) {
    super(message, 414);
  }
}
export class UnsupportedMediaTypeError extends ApiError {
  constructor(message: string) {
    super(message, 415);
  }
}
export class RangeNotSatisfiableError extends ApiError {
  constructor(message: string) {
    super(message, 416);
  }
}
export class ExpectationFailedError extends ApiError {
  constructor(message: string) {
    super(message, 417);
  }
}
export class PreconditionRequiredError extends ApiError {
  constructor(message: string) {
    super(message, 428);
  }
}
export class TooManyRequestsError extends ApiError {
  constructor(message: string) {
    super(message, 429);
  }
}
export class RequestHeaderFieldsTooLargeError extends ApiError {
  constructor(message: string) {
    super(message, 431);
  }
}
export class UnavailableForLegalReasonsError extends ApiError {
  constructor(message: string) {
    super(message, 451);
  }
}
