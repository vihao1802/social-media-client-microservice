import { UpdateUserRequest, User } from "@/models/user";
import axiosInstance from "./axios-instance";

const prefix = "/user";

export const userApi = {
  async getUserById(id: string) {
    const res = await axiosInstance.get<User>(`${prefix}/${id}`);
    return res.data;
  },

  async updateUser(payload: UpdateUserRequest) {
    const res = await axiosInstance.put(`${prefix}`, payload);
    return res;
  },
};
