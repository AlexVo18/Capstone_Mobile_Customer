export interface RegisterParams {
  name: string;
  email: string;
  address: string;
  phone: string;
  gender: number;
  dateBirth: string;
  password: string;
  rePassword?: string;
  company: string;
  position: string;
  taxNumber: string;
}
export interface RegisterInput {
  name: string;
  email: string;
  address: string;
  phone: string;
  citizenCard: string;
  gender: number;
  dateBirth: string;
  password: string;
  rePassword: string;
  company: string;
  position: string;
  taxNumber: string;
  businessType: number;
}
export interface ActivateParams {
  email: string;
  otp: string;
}

export interface LoginParams {
  email: string;
  password: string;
  firebaseMessageToken: string;
}

export interface UserData {
  accountId: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  dateCreate: string;
  address: string;
  status: string;
  roleId: number;
}

export interface TokenData {
  refreshToken: string;
  token: string;
  refreshTokenExpiryTime: string;
}

export interface RefreshParams {
  accessToken: string;
  refreshToken: string;
}
