import { CustomError } from "./CustomError";

export class InternalServerError extends CustomError {
  status = 500;
  message = "Internal Server Error";

  constructor(message = "") {
    super();
    this.message = `${this.message}: ${message}`;
  }
}
