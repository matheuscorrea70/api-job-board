import {
  FindManyOptions,
  FindOptionsWhere,
  RemoveOptions,
  Repository,
} from "typeorm";

export abstract class BaseModel<Entity> {
  protected abstract _repository: Repository<Entity>;

  findWithPagination = async (
    page: number,
    limit: number,
    options?: FindManyOptions<Entity>
  ) => {
    const skip = (page - 1) * limit;

    const count = await this._repository.count(options);

    const lastPage = Math.ceil(count / limit);
    const nextPage = page < lastPage ? page + 1 : undefined;

    const jobs = await this._repository.find({
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

  findOneBy = async (
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]
  ) => this._repository.findOneBy(where);

  remove = (entity: Entity, options?: RemoveOptions) => {
    return this._repository.remove(entity, options);
  };
}
