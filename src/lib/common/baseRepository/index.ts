import { QueryBuilder } from 'knex';
import { BaseRepositoryInterface } from './interface';
import {
  BaseRepositoryArguments,
  BaseRepositoryConnection,
  BaseRepositoryInternalOptions,
  defaultBaseRepositoryOptions,
} from './options';

export function BaseRepository<Entity, IdType = number>({
  table,
  selector,
  opts: opts_,
}: BaseRepositoryArguments) {
  const opts: BaseRepositoryInternalOptions = opts_
    ? {
        id: opts_.id === undefined ? defaultBaseRepositoryOptions.id : opts_.id,

        idGenerator: opts_.idGenerator,

        sourceInsertedAt:
          opts_.sourceInsertedAt === undefined
            ? defaultBaseRepositoryOptions.sourceInsertedAt
            : opts_.sourceInsertedAt,

        sourceUpdatedAt:
          opts_.sourceUpdatedAt === undefined
            ? defaultBaseRepositoryOptions.sourceUpdatedAt
            : opts_.sourceUpdatedAt,
      }
    : defaultBaseRepositoryOptions;

  return class implements BaseRepositoryInterface<Entity, IdType> {
    private readonly __connection__: BaseRepositoryConnection;

    constructor(connection: BaseRepositoryConnection) {
      this.__connection__ = connection;
    }

    public select(id: IdType): QueryBuilder {
      let query = this.__connection__.knex.select(...selector).from(table);

      if (typeof opts.id === 'string') {
        query = query.where(opts.id, id as any);
      }

      return query;
    }

    public selectMany(): QueryBuilder {
      return this.__connection__.knex.select(...selector).from(table);
    }

    public insert(attrs_: Partial<Entity>): QueryBuilder {
      const attrs = attrs_ as any;

      if (typeof opts.id === 'string' && typeof opts.idGenerator === 'function') {
        attrs[opts.id] = opts.idGenerator();
      }

      if (typeof opts.sourceInsertedAt === 'string') {
        attrs[opts.sourceInsertedAt] = new Date();
      }

      if (typeof opts.sourceUpdatedAt === 'string') {
        attrs[opts.sourceUpdatedAt] = new Date();
      }

      return this.__connection__.knex(table).insert(attrs, selector);
    }

    public update(id: IdType, attrs: Partial<Entity>): QueryBuilder {
      let query = this.__connection__.knex(table);

      if (typeof opts.id === 'string') {
        query = query.where(opts.id, id as any);
      }

      return query.update(attrs, selector);
    }

    public updateMany(attrs: any): QueryBuilder {
      return this.__connection__.knex(table).update(attrs, selector);
    }
  };
}
