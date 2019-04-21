import { QueryBuilder } from 'knex';

export interface BaseRepositoryInterface<Entity, IdType = number> {
  select(id: IdType): QueryBuilder;
  selectMany(): QueryBuilder;
  insert(attrs: Partial<Entity>): QueryBuilder;
  update(id: IdType, attrs: Partial<Entity>): QueryBuilder;
  updateMany(attrs: any): QueryBuilder;
}
