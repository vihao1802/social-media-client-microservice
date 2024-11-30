import axiosInstance from "@/api/axios-instance";

const prefix = "/comment";

export const commentApi = {
    async getCommentByPostId(postId: number) {
        const res = await axiosInstance.get(`${prefix}/post/${postId}`);
        return res.data;
    },

    async createComment(commentData: FormData) {
        const res = await axiosInstance.post(
          `${prefix}`,
          commentData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
    
        return res.data;
      },
}