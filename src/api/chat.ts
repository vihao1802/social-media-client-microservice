import axiosInstance from './axios-instance';
import { Chat, ChatAndMember, ChatPagination } from '@/models/chat';

const prefix = '/chats';

export const chatApi = {
  async getGroupChatByMe() {
    // this response include latest message of the group
    const res = await axiosInstance.get<ChatPagination>(`${prefix}/me/get-all`);

    return res.data;
  },
  async getChatById(chatId: string) {
    const res = await axiosInstance.get<ChatAndMember>(`${prefix}/${chatId}`);
    return res.data;
  },
  async createGroupChat(payload: FormData) {
    const res = await axiosInstance.post<Chat>(`${prefix}/Create`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res;
  },
  async getAllChatByUserId(userId: string) {
    const res = await axiosInstance.get<ChatPagination>(
      `${prefix}/users/${userId}?page=0&size=6`
    );
    return res.data;
  },
};
