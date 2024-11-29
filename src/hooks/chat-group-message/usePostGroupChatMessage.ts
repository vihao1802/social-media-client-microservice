import { chatGroupMessageApi } from "@/api/chat-group-message";
import { CreateChatGroupMessageRequest } from "@/models/chat-group-message";
import useSWR, { mutate } from "swr";

export function usePostGroupChatMessage() {
  const swrResponse = useSWR(["post_group_chat_message"], {
    dedupingInterval: 30 * 1000, // 30s
    keepPreviousData: true,
    fallbackData: null,
  });

  async function createMessage(payload: CreateChatGroupMessageRequest) {
    const res = await chatGroupMessageApi.createMessage(payload);
    // Re-fetch the data for "get_group_chat_by_id" after the message is created
    await mutate("get_group_chat_by_id");
    return res;
  }

  return { ...swrResponse, createMessage };
}
