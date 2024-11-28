import { messageApi } from "@/api/message";
import { CreateMessageRequest } from "@/models/message";
import { useState } from "react";
import useSWR from "swr";

export function usePostMessage() {
  const swrResponse = useSWR(["post_message"], {
    dedupingInterval: 30 * 1000, // 30s
    keepPreviousData: true,
    fallbackData: null,
  });

  async function createMessage(payload: CreateMessageRequest) {
    const res = await messageApi.createMessage(payload);
    return res;
  }

  return { ...swrResponse, createMessage };
}
