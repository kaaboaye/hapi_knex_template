import { Service } from 'typedi';
import { PostCommentService } from '../../../lib/postComments/postComment.service';

@Service()
export class WebV1PostCommentController {
  constructor(private readonly commentService: PostCommentService) {}

  public readonly index = async ({ params: { postId } }: any) => ({
    data: await this.commentService.getPostComments(postId),
  });
}
