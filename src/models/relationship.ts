export interface FollowUserRequest {
  user_id: string;
}

export interface Recommendation {
  id: string;
  userName: string;
  profile_img: string;
  mutualFriends: number;
}

export interface RecommendationPagination {
  items: Recommendation[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
