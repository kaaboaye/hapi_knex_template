import { Service } from 'typedi';
import { BaseRepository } from '../common/baseRepository';
import { UUID, uuidGenerate } from '../common/uuid';
import { DatabaseConnection } from '../databaseConnection';
import { PostComment } from './postComment.interface';

@Service()
export class PostCommentRepository extends BaseRepository<PostComment, UUID>({
  table: 'comments',
  selector: [
    'id',
    'author',
    'content',
    'post_id AS postId',
    'inserted_at AS insertedAt',
    'updated_at AS updatedAs',
  ],
  opts: {
    idGenerator: uuidGenerate,
    sourceInsertedAt: 'inserted_at',
    sourceUpdatedAt: 'updated_at',
  },
}) {
  constructor(connection: DatabaseConnection) {
    super(connection);
  }

  public selectPostComments(postId: UUID) {
    return this.selectMany().where('post_id', postId);
  }
}
