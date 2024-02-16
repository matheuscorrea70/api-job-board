import { body } from "express-validator";

export const bodyJobValidator = () => [
  body(["title", "description"]).isString(),
  body("url").isURL(),
  body("company").custom(async (value) => {
    if (!value?.id && !value?.name) {
      throw new Error("Invalid company!");
    }
  }),
  body("company.id").isNumeric().optional(),
  body("company.name").isString().optional(),
];
