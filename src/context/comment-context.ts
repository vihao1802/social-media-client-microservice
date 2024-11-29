import { createContext } from "react";

export const CommentContext = createContext<{
    parentCommentId: number | null;
    commentContent: string;
    setParentCommentId: React.Dispatch<React.SetStateAction<number | null>>;
    setCommentContent: React.Dispatch<React.SetStateAction<string>>;
}>({
    parentCommentId: null,
    commentContent: "",
    setParentCommentId: () => {},
    setCommentContent: () => {}
});