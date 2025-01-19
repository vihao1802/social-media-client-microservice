import axiosInstance from './axios-instance';

const prefix = '/GroupMember';

export const chatGroupMemberApi = {
  async getMembersByGroupId(groupId: string) {
    const res = await axiosInstance.get(`${prefix}/GetAllByGroup/${groupId}`);

    return res.data;
  },
};
