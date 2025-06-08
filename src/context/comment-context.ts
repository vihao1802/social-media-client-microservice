import { createContext } from 'react';

export const CommentContext = createContext<{
  replyTo: string| null;
  commentContent: string;
  setReplyTo: React.Dispatch<React.SetStateAction<string| null>>;
  setCommentContent: React.Dispatch<React.SetStateAction<string>>;
}>({
  replyTo: null,
  commentContent: '',
  setReplyTo: () => {},
  setCommentContent: () => {},
});
