import { ServerRoute } from 'hapi';
import { object, string } from 'joi';
import { Service } from 'typedi';
import { WebV1PostController } from './post.controller';

const path = '/rest/v1/posts';

@Service()
export class WebV1PostRoutes {
  constructor(private readonly postController: WebV1PostController) {}

  public readonly routes: ServerRoute[] = [
    {
      method: 'GET',
      path,
      handler: this.postController.index,
    },
    {
      method: 'GET',
      path: path + '/{postId}',
      handler: this.postController.show,
      options: {
        validate: {
          params: {
            postId: string()
              .uuid()
              .required(),
          },
        },
      },
    },
    {
      method: 'POST',
      path,
      handler: this.postController.create,
      options: {
        validate: {
          payload: {
            post: object()
              .keys({
                title: string().required(),
                content: string().required(),
              })
              .required(),
          },
        },
      },
    },
    {
      method: 'PATCH',
      path: path + '/{postId}',
      handler: this.postController.change,
      options: {
        validate: {
          params: {
            postId: string()
              .uuid()
              .required(),
          },
          payload: {
            post: object()
              .keys({
                title: string(),
                content: string(),
              })
              .required(),
          },
        },
      },
    },
  ];
}
