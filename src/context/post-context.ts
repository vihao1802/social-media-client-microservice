import { Post } from "@/models/post";
import { createContext } from "react";

export const PostContext = createContext<{

    post: Post | null;
  
  }>({
  
    post: null,
  
  });