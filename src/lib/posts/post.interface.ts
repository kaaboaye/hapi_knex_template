import { UUID } from '../common/uuid';

export interface Post {
  id: UUID;
  title: string;
  content: string;
  insertedAt: Date;
  updatedAt: Date;
}
