import axiosInstance from "@/api/axios-instance";

const prefix = "/court-types";

export const courtTypeApi = {
    async getActiveCourtTypes(params: { isdisabled: number }) {
        const res = await axiosInstance.get(`${prefix}/active`, { params });
        return res.data;
    }
}