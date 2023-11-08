import { privateRequest, publicRequest } from "../request";

const userServices = {
  changePassword: ({ password, newPassword, confirmPassword }) => {
    return publicRequest.request({
      method: "POST",
      url: "/me/change-password",
      data: { password, newPassword, confirmPassword },
    });
  },

  updateUserInfo: ({ avatar, background, birthday, firstName, gender, lastName }) => {
    return privateRequest.request({
      method: "PATCH",
      url: "/me",
      data: { avatar, background, birthday, firstName, gender, lastName },
    });
  },
};

export default userServices;
