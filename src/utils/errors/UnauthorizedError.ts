import { CustomError } from "./CustomError";

export class UnauthorizedError extends CustomError {
  status = 401;
  message = "Unauthorized";

  constructor(message = "") {
    super();
    this.message = `${this.message}: ${message}`;
  }
}
