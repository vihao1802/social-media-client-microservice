interface CommentReactionBase {
  userId: string;
  commentId: string;
}

export interface CommentReaction extends CommentReactionBase {
  id: string;
  reaction_at: string;
}

export interface CommentReactionRequest extends CommentReactionBase {}
