import { Service } from 'typedi';
import { BaseRepository } from '../common/baseRepository';
import { UUID, uuidGenerate } from '../common/uuid';
import { DatabaseConnection } from '../databaseConnection';
import { Post } from './post.interface';

@Service()
export class PostRepository extends BaseRepository<Post, UUID>({
  table: 'posts',
  selector: ['id', 'title', 'content', 'inserted_at AS insertedAt', 'updated_at AS updatedAt'],
  opts: {
    idGenerator: uuidGenerate,
    sourceInsertedAt: 'inserted_at',
    sourceUpdatedAt: 'updated_at',
  },
}) {
  constructor(connection: DatabaseConnection) {
    super(connection);
  }
}
