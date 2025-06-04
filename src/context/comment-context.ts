import { createContext } from 'react';

export const CommentContext = createContext<{
  parentCommentId: string| null;
  commentContent: string;
  setParentCommentId: React.Dispatch<React.SetStateAction<string| null>>;
  setCommentContent: React.Dispatch<React.SetStateAction<string>>;
}>({
  parentCommentId: null,
  commentContent: '',
  setParentCommentId: () => {},
  setCommentContent: () => {},
});
