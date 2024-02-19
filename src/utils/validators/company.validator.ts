import { body, type ValidationChain } from "express-validator";
import { CompanySize } from "models/types/company.types";

export const bodyCompanyValidator = (): ValidationChain[] => [
  body("name").isString(),
  body("size").isIn(Object.values(CompanySize)),
];
