import { type Request } from "express";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export const getPaginationParams = (request: Request) => {
  const page = Number(request.query.page || DEFAULT_PAGE);
  const limit = Number(request.query.limit || DEFAULT_LIMIT);

  return { page, limit };
};
