import { UUID } from '../common/uuid';
import { Post } from '../posts/post.interface';

export interface PostComment {
  id: UUID;
  author: string;
  content: string;
  postId: UUID;
  post: Post;
  insertedAt: Date;
  updatedAt: Date;
}
