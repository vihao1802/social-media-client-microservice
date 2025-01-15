import { RelationshipStatus, RelationshipType } from '@/types/enum';
import { User } from './user';

export interface RelationshipFollowerBase {
  senderId: string;
  relationship_type: RelationshipType;
}

export interface RelationshipFollower extends RelationshipFollowerBase {
  id: number;
  create_at: string;
  status: RelationshipStatus;
  sender: User;
}

export interface RelationshipFollowerRequest extends RelationshipFollowerBase {}

export interface FollowerQuantity {
  quantity: number;
}
