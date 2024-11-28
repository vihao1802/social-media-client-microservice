import { CreateMessageRequest, Message } from "@/models/message";
import axiosInstance from "./axios-instance";

const prefix = "/messenge";

export const messageApi = {
  async getMessageByRelationshipId(relationshipId: string) {
    const res = await axiosInstance.get<Message[]>(
      `${prefix}/${relationshipId}`
    );
    return res;
  },

  async createMessage(payload: CreateMessageRequest) {
    const { relationshipId, content, replyToId } = payload;
    const res = await axiosInstance.post(
      `${prefix}/${relationshipId}?Content=${content}&ReplyToId=${replyToId}`
    );
    return res;
  },
};
