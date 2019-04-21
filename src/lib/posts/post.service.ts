import { badImplementation, notFound } from 'boom';
import { Service } from 'typedi';
import { inlineThrow } from '../common/inlineThrow';
import { UUID } from '../common/uuid';
import { Post } from './post.interface';
import { PostRepository } from './post.repository';

@Service()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public getPosts(): Promise<ReadonlyArray<Post>> {
    return (this.postRepository.selectMany() as any) as Promise<Post[]>;
  }

  public async getPost(id: UUID): Promise<Readonly<Post>> {
    return (await this.postRepository.select(id))[0] || inlineThrow(notFound());
  }

  public async createPost(attrs: Partial<Post>): Promise<Post> {
    return (await this.postRepository.insert(attrs))[0] || inlineThrow(badImplementation());
  }

  public async updatePost(id: UUID, attrs: Partial<Post>): Promise<Post> {
    return (await this.postRepository.update(id, attrs))[0] || inlineThrow(notFound());
  }
}
