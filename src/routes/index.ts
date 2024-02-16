import { Router } from 'express';
import company from './company.route';
import job from './job.route';
import country from './country.route';
import province from './province.route';

const routes = Router();

routes.use('/v1/company', company);
routes.use('/v1/job', job);
routes.use('/v1/country', country);
routes.use('/v1/province', province);

export { routes };
