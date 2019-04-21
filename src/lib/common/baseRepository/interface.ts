import { QueryBuilder } from 'knex';
import { BaseRepositoryTable } from './options';

export interface BaseRepositoryInterface<Entity, IdType = number> {
  table: BaseRepositoryTable;
  select(id: IdType): QueryBuilder;
  selectMany(): QueryBuilder;
  insert(attrs: Partial<Entity>): QueryBuilder;
  update(id: IdType, attrs: Partial<Entity>): QueryBuilder;
}
