import { QueryBuilder } from 'knex';
import { Repo } from '../../repo';
import { BaseRepositoryInterface } from './interface';
import {
  BaseRepositoryInternalOptions,
  BaseRepositoryOptions,
  BaseRepositorySelector,
  BaseRepositoryTable,
  defaultBaseRepositoryOptions,
} from './options';

export function BaseRepository<Entity, IdType = number>(
  table: BaseRepositoryTable,
  selector: BaseRepositorySelector,
  repo: Repo,
  opts?: BaseRepositoryOptions,
) {
  return class implements BaseRepositoryInterface<Entity, IdType> {
    public readonly table: BaseRepositoryTable = table;
    protected readonly selector: BaseRepositorySelector = selector;
    private readonly __opts__: Readonly<BaseRepositoryInternalOptions> = opts
      ? {
          id: opts.id === undefined ? defaultBaseRepositoryOptions.id : opts.id,

          idGenerator: opts.idGenerator,

          sourceInsertedAt:
            opts.sourceInsertedAt === undefined
              ? defaultBaseRepositoryOptions.sourceInsertedAt
              : opts.sourceInsertedAt,

          sourceUpdatedAt:
            opts.sourceUpdatedAt === undefined
              ? defaultBaseRepositoryOptions.sourceUpdatedAt
              : opts.sourceUpdatedAt,
        }
      : defaultBaseRepositoryOptions;
    private readonly __repo__: Repo = repo;

    public select(id: IdType): QueryBuilder {
      let query = this.__repo__.knex.select(...this.selector).from(this.table);

      if (typeof this.__opts__.id === 'string') {
        query = query.where(this.__opts__.id, id as any);
      }

      return query;
    }

    public selectMany(): QueryBuilder {
      return this.__repo__.knex.select(...this.selector).from(this.table);
    }

    public insert(attrs_: Partial<Entity>): QueryBuilder {
      const attrs = attrs_ as any;

      if (typeof this.__opts__.id === 'string' && typeof this.__opts__.idGenerator === 'function') {
        attrs[this.__opts__.id] = this.__opts__.idGenerator();
      }

      if (typeof this.__opts__.sourceInsertedAt === 'string') {
        attrs[this.__opts__.sourceInsertedAt] = new Date();
      }

      if (typeof this.__opts__.sourceUpdatedAt === 'string') {
        attrs[this.__opts__.sourceUpdatedAt] = new Date();
      }

      return this.__repo__.knex(this.table).insert(attrs, this.selector);
    }

    public update(id: IdType, attrs: Partial<Entity>): QueryBuilder {
      let query = this.__repo__.knex(this.table);

      if (typeof this.__opts__.id === 'string') {
        query = query.where(this.__opts__.id, id as any);
      }

      return query.update(attrs, this.selector);
    }
  };
}
