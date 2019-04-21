import * as knex from 'knex';
import { Service } from 'typedi';

@Service()
export class Repo {
  public readonly knex: knex = knex({
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'mysecretpassword',
      database: 'postgres',
      port: 32666,
      ssl: false,
    },
  }).on('query', (q: any) => console.log(q.sql)) as any;
}
