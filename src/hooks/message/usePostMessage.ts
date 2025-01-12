import { messageApi } from '@/api/message';
import { CreateMessageRequest } from '@/models/message';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';

export function usePostMessage() {
  async function createMessage(payload: CreateMessageRequest) {
    const res = await messageApi.createMessage(payload);
    // Re-fetch the data for "get_personal_messenger" after the message is created
    await mutate('get_personal_messenger');
    return res;
  }

  return { createMessage };
}
