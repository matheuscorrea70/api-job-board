import { param, type ValidationChain } from "express-validator";

export const paramIdValidator = (): ValidationChain[] => [param("id").isNumeric()];
