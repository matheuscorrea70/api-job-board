import { CustomError } from "./CustomError";

export class ForbiddenError extends CustomError {
  status = 403;
  message = "Forbidden";

  constructor(message = "") {
    super();
    this.message = `${this.message}: ${message}`;
  }
}
