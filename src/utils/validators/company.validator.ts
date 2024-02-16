import { body } from "express-validator";

export const bodyCompanyValidator = () => [body("name").isString()];
