import {
  CreateMessageRequest,
  Message,
  MessagePagination,
} from '@/models/message';
import axiosInstance from './axios-instance';

const prefix = '/messages';

export const messageApi = {
  async getMessagesByChatId(chatId: string, size = 10, cursor = '') {
    const res = await axiosInstance.get<MessagePagination>(
      `${prefix}?chatId=${chatId}&size=${size}&cursor=${cursor}`
    );
    return res.data;
  },

  async createMessage(payload: CreateMessageRequest) {
    const {
      chatId,
      msgContent,
      msgMediaContent,
      senderId,
      senderName,
      replyTo,
    } = payload;

    const formData = new FormData();

    formData.append('chatId', chatId);
    formData.append('msgContent', msgContent);
    formData.append('senderId', senderId);
    formData.append('senderName', senderName);
    formData.append('replyTo', replyTo ? replyTo.toString() : '');

    if (msgMediaContent) formData.append('msgMediaContent', msgMediaContent);

    const res = await axiosInstance.post<Message>(`${prefix}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Override content type
      },
    });
    return res.data;
  },
};
