import { ServerRoute } from 'hapi';
import { Service } from 'typedi';
import { WebV1PostCommentRoutes } from './v1/postComments/postComments.routes';
import { WebV1PostRoutes } from './v1/posts/post.routes';

@Service()
export class WebRoutes {
  constructor(
    private readonly v1Post: WebV1PostRoutes,
    private readonly v1PostComment: WebV1PostCommentRoutes,
  ) {}

  public readonly routes: ServerRoute[] = [...this.v1Post.routes, ...this.v1PostComment.routes];
}
