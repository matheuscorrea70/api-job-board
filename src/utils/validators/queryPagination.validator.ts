import { type ValidationChain, query } from "express-validator";

export const queryPaginationValidator = (): ValidationChain[] => [
  query("page").isNumeric().optional(),
  query("limit").isNumeric().optional(),
];
