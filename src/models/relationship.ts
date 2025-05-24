export interface FollowUserRequest {
  user_id: string;
}

export interface Recommendation {
  id: string;
  userName: string;
  profileImg: string;
  mutualFriends: number;
}

export interface RecommendationPagination {
  items: Recommendation[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
