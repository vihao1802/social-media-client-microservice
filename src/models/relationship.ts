export interface FollowUserRequest {
  user_id: string;
}

export interface Recommendation {
  mutualFriends: number;
  id: string;
  username: string;
  email: string;
  profileImg: string;
}

export interface RecommendationPagination {
  data: Recommendation[];
  total: number;
  page: number;
  pageSize: number;
  totalPage: number;
}
