import { Visibility } from "@/types/enums";
import { User } from "./user";

export interface PostBase {
    content: string;
    is_story: boolean;
    created_at: string;
}

export interface Post extends PostBase {
    id: string;
    visibility: Visibility;
    creator: User,
}