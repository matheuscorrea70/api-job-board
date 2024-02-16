import { Router } from 'express';
import company from './company';
import job from './job';

const routes = Router();

routes.use('/v1/company', company);
routes.use('/v1/job', job);

export { routes };
