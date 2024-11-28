import { Visibility } from "@/types/enums";
import { User } from "./user";

export interface PostBase {
    content: string;
    is_story: boolean;
    create_at: string;
}

export interface Post extends PostBase {
    id: number;
    visibility: Visibility;
    creator: User,
    postReactions: number;
}