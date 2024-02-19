import { Router, Request, Response, NextFunction } from "express";
import company from "./company.route";
import job from "./job.route";
import country from "./country.route";
import province from "./province.route";
import { authenticateToken } from "utils/token/authenticateToken";

const routes = Router();

routes.use("/v1/company", authenticateToken, company);
routes.use("/v1/job", authenticateToken, job);
routes.use("/v1/country", authenticateToken, country);
routes.use("/v1/province", authenticateToken, province);

export { routes };
