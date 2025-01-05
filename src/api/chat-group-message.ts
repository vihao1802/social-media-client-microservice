import {
  ChatGroupMessagePagination,
  CreateChatGroupMessageRequest,
} from '@/models/chat-group-message';
import axiosInstance from './axios-instance';

const prefix = '/GroupMessenge';

export const chatGroupMessageApi = {
  async getMessagesByGroupId(groupId: string) {
    const res = await axiosInstance.get<ChatGroupMessagePagination>(
      `${prefix}/GetAllByGroupId/${groupId}`
    );
    return res.data;
  },
  async createMessage(payload: CreateChatGroupMessageRequest) {
    const { GroupId, Content, ReplyToId, MediaFile, SenderId, MediaContent } =
      payload;

    const formData = new FormData();

    formData.append('Content', Content);
    formData.append('MediaContent', MediaContent);
    formData.append('GroupId', GroupId);
    formData.append('SenderId', SenderId);
    formData.append('ReplyToId', ReplyToId);

    if (MediaFile) {
      formData.append('MediaFile', MediaFile);
    }

    const res = await axiosInstance.post(`${prefix}/Create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Override content type
      },
    });

    return res;
  },
};
