import {
  ActivateParams,
  ChangePasswordParams,
  ForgetPasswordParams,
  LoginParams,
  RefreshParams,
  RegisterParams,
  UserDetailData,
} from "~/src/app/models/auth_models";
import requests from "../request";

const Auth = {
  login: (input: LoginParams) =>
    requests.baseApiPost("/auth/email/login", {
      email: input.email,
      password: input.password,
      firebaseMessageToken: input.firebaseMessageToken,
    }),
  register: (input: RegisterParams) =>
    requests.codeApiPost("/auth/register", {
      name: input.name,
      email: input.email,
      address: input.address,
      phone: input.phone,
      gender: input.gender,
      dateBirth: input.dateBirth,
      password: input.password,
      company: input.company,
      position: input.position,
      taxNumber: input.taxNumber,
    }),
  sendOpt: (email: string) =>
    requests.codeApiGet(`/auth/send-otp?email=${email}`),
  activateAccount: (input: ActivateParams) =>
    requests.codeApiPost(`/auth/activate-account`, {
      email: input.email,
      otp: input.otp,
    }),
  refreshAccessToken: (input: RefreshParams) =>
    requests.baseApiPost("/auth/refresh", {
      accessToken: input.accessToken,
      refreshToken: input.refreshToken,
    }),
  logout: () => requests.jwtApiGet("/auth/logout"),
  forgetPassword: (input: ForgetPasswordParams) =>
    requests.codeApiPost("/auth/change-password/otp", {
      email: input.email,
      otp: input.otp,
      password: input.password,
    }),
  changePassword: (input: ChangePasswordParams) =>
    requests.codeJwtApiPost("/auth/change-password", {
      oldPassword: input.oldPassword,
      password: input.password,
    }),
  getUserDetail: () => requests.jwtApiGet(`/accounts/login-user-detail/`),
  updateUserDetail: (input: UserDetailData) =>
    requests.jwtApiPut(`/accounts/customers`, {
      name: input.name,
      email: input.email,
      address: input.address,
      phone: input.phone,
      gender: input.gender,
      dateBirth: input.dateBirth,
      company: input.company,
      position: input.position,
      taxNumber: input.taxNumber,
      avatarImg: input.avatarImg,
    }),
};

export default Auth;
