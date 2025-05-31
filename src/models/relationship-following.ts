import { RelationshipStatus, RelationshipType } from '@/types/enum';
import { User } from './user';

export interface RelationshipFollowingList {
  status: number;
  data: {
    total: number;
    page: number;
    pageSize: number;
    totalPage: number;
    data: Following[];
  };
  message: string;
}
export interface Following {
  Id: string;
  ReceiverId: string;
  Receiver: Receiver;
  Status: string;
  CreatedAt: string;
  UpdatedAt: string;
}
export interface Receiver {
  id: string;
  username: string;
  profileImg: string;
  email: string;
}
export interface FollowingQuantity {
  quantity: number;
}
