import {
  ActivateParams,
  LoginParams,
  RefreshParams,
  RegisterParams,
} from "~/src/app/models/auth_models";
import requests from "../requests";

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
  sendOpt: (email: string) => requests.codeApiGet(`/auth/send-otp?email=${email}`),
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
};

export default Auth;
