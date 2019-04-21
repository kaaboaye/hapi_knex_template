import { QueryBuilder } from 'knex';
import { Repo } from '../repo';

export type BaseRepositoryTable = string;
export type BaseRepositorySelector = string[];
export type BaseRepositoryColumnName = string | false;
export type BaseRepositoryIdGenerator = () => any;

export interface BaseRepositoryOptions {
  id?: BaseRepositoryColumnName;
  idGenerator?: BaseRepositoryIdGenerator;
  sourceInsertedAt?: BaseRepositoryColumnName;
  sourceUpdatedAt?: BaseRepositoryColumnName;
}

export interface BaseRepositoryInternalOptions {
  id: BaseRepositoryColumnName;
  idGenerator?: BaseRepositoryIdGenerator;
  sourceInsertedAt: BaseRepositoryColumnName;
  sourceUpdatedAt: BaseRepositoryColumnName;
}

export const defaultBaseRepositoryOptions: Readonly<BaseRepositoryInternalOptions> = Object.freeze({
  id: 'id',
  sourceInsertedAt: 'insertedAt',
  appInsertedAt: 'insertedAt',
  sourceUpdatedAt: 'updatedAt',
  appUpdatedAt: 'updatedAt',
});

export class BaseRepository<IdType, Entity> {
  constructor(
    public readonly table: BaseRepositoryTable,
    protected readonly selector: BaseRepositorySelector,
    repo: Repo,
    opts?: BaseRepositoryOptions,
  ) {
    this.__repo__ = repo;

    if (opts) {
      this.__opts__ = {
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
      };
    } else {
      this.__opts__ = defaultBaseRepositoryOptions;
    }

    console.log(this.__opts__);
  }

  private readonly __opts__: Readonly<BaseRepositoryInternalOptions>;
  private readonly __repo__: Repo;

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
}
