import * as knex from 'knex';

export type BaseRepositoryTable = string;
export type BaseRepositorySelector = string[];
export type BaseRepositoryColumnName = string | false;
export type BaseRepositoryIdGenerator = () => any;

export interface BaseRepositoryConnection {
  knex: knex;
}

export interface BaseRepositoryArguments {
  table: BaseRepositoryTable;
  selector: BaseRepositorySelector;
  opts?: BaseRepositoryOptions;
}

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
