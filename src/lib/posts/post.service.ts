import { badImplementation, notFound } from 'boom';
import { Service } from 'typedi';
import { inlineThrow } from '../common/inlineThrow';
import { UUID } from '../common/uuid';
import { PostCommentService } from '../postComments/postComment.service';
import { Post } from './post.interface';
import { PostRepository } from './post.repository';

@Service()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly commentService: PostCommentService,
  ) {}

  public getPosts(): Promise<Post[]> {
    return (this.postRepository.selectMany() as any) as Promise<Post[]>;
  }

  public async getPost(id: UUID): Promise<Post> {
    return (await this.postRepository.select(id))[0] || inlineThrow(notFound());
  }

  public async getPostWithComments(id: UUID): Promise<Post> {
    const [post, comments] = await Promise.all([
      this.getPost(id),
      this.commentService.getPostComments(id),
    ]);

    post.comments = comments;
    return post;
  }

  public async createPost(attrs: Partial<Post>): Promise<Post> {
    return (await this.postRepository.insert(attrs))[0] || inlineThrow(badImplementation());
  }

  public async updatePost(id: UUID, attrs: Partial<Post>): Promise<Post> {
    return (await this.postRepository.update(id, attrs))[0] || inlineThrow(notFound());
  }
}
