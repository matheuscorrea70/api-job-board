import { Job } from "models/entities/Job";
import dataSource from "configs/dataSource";

class JobModel {
  static repository = dataSource.getRepository(Job);
}

export default JobModel;
