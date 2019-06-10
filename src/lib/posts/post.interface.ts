import { UUID } from '../common/uuid';
import { PostComment } from '../postComments/postComment.interface';

export interface Post {
  id: UUID;
  title: string;
  content: string;
  comments: ReadonlyArray<PostComment>;
  insertedAt: Date;
  updatedAt: Date;
}
