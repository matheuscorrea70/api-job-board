import {
  FindManyOptions,
  FindOptionsWhere,
  ObjectLiteral,
  RemoveOptions,
  Repository,
} from "typeorm";

export abstract class BaseModel<Entity extends ObjectLiteral> {
  protected abstract _repository: Repository<Entity>;

  find = async (options?: FindManyOptions<Entity>) => this._repository.find(options);

  findWithPagination = async (
    page: number,
    limit: number,
    options?: FindManyOptions<Entity>
  ) => {
    const skip = (page - 1) * limit;

    const count = await this._repository.count(options);

    const lastPage = Math.ceil(count / limit);
    const nextPage = page < lastPage ? page + 1 : undefined;

    const data = await this._repository.find({
      take: limit,
      skip,
      ...options,
    });

    return {
      total: count,
      lastPage,
      ...(nextPage && { nextPage }),
      data,
    };
  };

  findOneBy = async (
    where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]
  ) => this._repository.findOneBy(where);

  remove = (entity: Entity, options?: RemoveOptions) => {
    return this._repository.remove(entity, options);
  };
}
