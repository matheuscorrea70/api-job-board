import { FindManyOptions, Repository } from "typeorm";

export abstract class BaseModel<T> {
  abstract repository: Repository<T>;

  findWithPagination = async (
    page: number,
    limit: number,
    options?: FindManyOptions<T>
  ) => {
    const skip = (page - 1) * limit;

    const count = await this.repository.count(options);

    const lastPage = Math.ceil(count / limit);
    const nextPage = page < lastPage ? page + 1 : undefined;

    const jobs = await this.repository.find({
      take: limit,
      skip,
      ...options,
    });

    return {
      total: count,
      lastPage,
      ...(nextPage && { nextPage }),
      data: jobs,
    };
  };
}
