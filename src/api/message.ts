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
    const { relationshipId, content, replyToId, files } = payload;

    const formData = new FormData();

    formData.append("Content", content);
    formData.append("ReplyToId", replyToId.toString());

    if (files) {
      formData.append("files", files);
    }

    const res = await axiosInstance.post(
      `${prefix}/${relationshipId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Override content type
        },
      }
    );
    return res;
  },
};
