import { Service } from 'typedi';
import { PostService } from '../../../lib/posts/post.service';

@Service()
export class WebV1PostController {
  constructor(private readonly postService: PostService) {}

  public readonly index = async () => ({
    data: await this.postService.getPosts(),
  });

  public readonly show = async ({ params: { postId } }: any) => ({
    data: await this.postService.getPost(postId),
  });

  public readonly create = async ({ payload: { post } }: any) => ({
    data: await this.postService.createPost(post),
  });

  public readonly change = async ({ params: { postId }, payload: { post } }: any) => ({
    data: await this.postService.updatePost(postId, post),
  });
}
