import { RelationshipStatus, RelationshipType } from "@/types/enum";
import { User } from "./user";

export interface RelationshipFollowingBase {
  receiverId: number;
  relationship_type: RelationshipType;
}

export interface RelationshipFollowing extends RelationshipFollowingBase {
  id: number;
  create_at: string;
  status: RelationshipStatus;
  receiver: User;
}

export interface RelationshipFollowingRequest
  extends RelationshipFollowingBase {}
