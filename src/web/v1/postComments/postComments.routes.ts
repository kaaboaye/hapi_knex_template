import { ServerRoute } from 'hapi';
import { Service } from 'typedi';
import { WebV1PostCommentController } from './postComments.controller';

const path = '/rest/v1/posts/{postId}/comments';

@Service()
export class WebV1PostCommentRoutes {
  constructor(private readonly commentController: WebV1PostCommentController) {}

  public readonly routes: ServerRoute[] = [
    {
      method: 'GET',
      path,
      handler: this.commentController.index,
    },
  ];
}
