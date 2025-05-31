import { RelationshipStatus, RelationshipType } from '@/types/enum';
import { User } from './user';

export interface RelationshipFollowerList {
  status: number;
  data: {
    total: number;
    page: number;
    pageSize: number;
    totalPage: number;
    data: Follower[];
  };
  message: string;
}
export interface Follower {
  Id: string;
  SenderId: string;
  Sender: Sender;
  Status: string;
  CreatedAt: string;
  UpdatedAt: string;
}
export interface Sender {
  id: string;
  username: string;
  profileImg: string;
  email: string;
}
export interface FollowerQuantity {
  quantity: number;
}
