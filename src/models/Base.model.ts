import {
  type FindManyOptions,
  type FindOptionsWhere,
  type ObjectLiteral,
  type RemoveOptions,
  type Repository,
} from "typeorm";

export abstract class BaseModel<Entity extends ObjectLiteral> {
  protected abstract _repository: Repository<Entity>;

  async find(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    return await this._repository.find(options);
  }

  async findWithPagination(
    page: number,
    limit: number,
    options?: FindManyOptions<Entity>
  ): Promise<{
    data: Entity[];
    nextPage?: number | undefined;
    total: number;
    lastPage: number;
  }> {
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
  }

  async findOneBy(
    where: FindOptionsWhere<Entity> | Array<FindOptionsWhere<Entity>>
  ): Promise<Entity | null> {
    return await this._repository.findOneBy(where);
  }

  async remove(entity: Entity, options?: RemoveOptions): Promise<Entity> {
    return await this._repository.remove(entity, options);
  }

  async softRemove(entity: Entity, options?: RemoveOptions): Promise<Entity> {
    return await this._repository.softRemove(entity, options);
  }
}
