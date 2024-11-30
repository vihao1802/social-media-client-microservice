interface CommentReactionBase {
    userId: string;
    commentId: number;
}

export interface CommentReaction extends CommentReactionBase {
    id: number;
    reaction_at: string;
}

export interface CommentReactionRequest extends CommentReactionBase {}