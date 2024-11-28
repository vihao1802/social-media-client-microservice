import { RelationshipFollower } from "@/models/relationship-follower";
import axiosInstance from "./axios-instance";
import { RelationshipFollowing } from "@/models/relationship-following";

const prefix = "/relationship";

export const relationshipApi = {
  async getRelationshipMeFollower() {
    const res = await axiosInstance.get<RelationshipFollower[]>(
      `${prefix}/me/follower`
    );
    return res.data;
  },
  async getRelationshipMeFollowing() {
    const res = await axiosInstance.get<RelationshipFollowing[]>(
      `${prefix}/me/following`
    );
    return res.data;
  },
};
