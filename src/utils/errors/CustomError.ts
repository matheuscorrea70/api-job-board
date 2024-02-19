export abstract class CustomError extends Error {
  abstract status: number;
  abstract message: string;
}
