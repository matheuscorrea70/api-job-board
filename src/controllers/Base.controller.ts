import { Request, Response } from "express";
import { validationResult } from "express-validator";

export abstract class BaseController<Model = undefined> {
  abstract model: Model;

  validateRequest = (request: Request, response: Response) => {
    const result = validationResult(request);

    console.log('result', result)

    if (!result.isEmpty()) {
      response.send({ errors: result.array() });

      return false
    }

    return true
  }

  getParamId = <T = number>(request: Request) => {
    return request.params.id as T
  }
}
