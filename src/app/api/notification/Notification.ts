import requests from "../request";

const Notification = {
  getUserNotifications: (input: number) =>
    requests.jwtApiGet(`/notifications/${input}`),
};
export default Notification;
