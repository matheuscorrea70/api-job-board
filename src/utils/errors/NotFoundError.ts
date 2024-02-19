import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
  status = 404;
  message = "Not found";

  constructor(message = "") {
    super();
    this.message = `${this.message}: ${message}`;
  }
}
