import { Router } from 'express';
import company from './company.route';
import job from './job.route';

const routes = Router();

routes.use('/v1/company', company);
routes.use('/v1/job', job);

export { routes };
