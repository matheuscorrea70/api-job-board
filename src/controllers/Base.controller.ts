import { Request, Response } from "express";
import { validationResult } from "express-validator";

export abstract class BaseController<Model> {
  abstract model: Model;

  validateRequest = (request: Request, response: Response) => {
    const result = validationResult(request);

    if (!result.isEmpty()) {
      response.send({ errors: result.array() });

      return false
    }

    return true
  }
}
