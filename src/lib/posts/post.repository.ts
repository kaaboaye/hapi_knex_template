import Container, { Service } from 'typedi';
import { BaseRepository } from '../common/baseRepository';
import { UUID, uuidGenerate } from '../common/uuid';
import { Repo } from '../repo';
import { Post } from './post.interface';

@Service()
export class PostRepository extends BaseRepository<Post, UUID>(
  'posts',
  ['id', 'title', 'content', 'inserted_at AS insertedAt', 'updated_at AS updatedAt'],
  Container.get(Repo),
  {
    idGenerator: uuidGenerate,
    sourceInsertedAt: 'inserted_at',
    sourceUpdatedAt: 'updated_at',
  },
) {}
