import axiosInstance from "@/api/axios-instance";

const prefix = "/post";

export const postApi = {
    async getFriendStories() {
        const res = await axiosInstance.get(`${prefix}/stories`);
        return res.data;
    }
}