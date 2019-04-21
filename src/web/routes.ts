import { ServerRoute } from 'hapi';
import { Service } from 'typedi';
import { WebV1PostRoutes } from './v1/posts/post.routes';

@Service()
export class WebRoutes {
  constructor(private readonly v1Post: WebV1PostRoutes) {}

  public readonly routes: ServerRoute[] = [...this.v1Post.routes];
}
