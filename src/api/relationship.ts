import { RelationshipFollower } from "@/models/relationship-follower";
import axiosInstance from "./axios-instance";
import { RelationshipFollowing } from "@/models/relationship-following";
import { PersonalMessenger } from "@/models/personal-messenger";

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
  async getPersonalMessenger() {
    const res = await axiosInstance.get<PersonalMessenger[]>(
      `${prefix}/me/personal-messenger`
    );
    return res.data;
  },
};
