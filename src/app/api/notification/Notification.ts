import requests from "../request";

const Notification = {
  getUserNotifications: (input: number) =>
    requests.jwtApiGet(`/notifications/${input}`),
  updateNotiStatus: (input: number) =>
    requests.codeApiPut(`/notifications?key=${input}`, {}),
};
export default Notification;
