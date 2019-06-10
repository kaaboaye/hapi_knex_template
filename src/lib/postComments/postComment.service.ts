import { Service } from 'typedi';
import { UUID } from '../common/uuid';
import { PostComment } from './postComment.interface';
import { PostCommentRepository } from './postComment.repository';

@Service()
export class PostCommentService {
  constructor(private readonly commentRepository: PostCommentRepository) {}

  public getPostComments(postId: UUID): Promise<PostComment[]> {
    return this.commentRepository.selectPostComments(postId) as any;
  }
}
