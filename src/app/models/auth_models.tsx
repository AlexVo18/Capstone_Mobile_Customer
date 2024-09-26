export interface RegisterParams {
  name: string;
  email: string;
  address: string;
  phone: string;
  citizenCard: string;
  gender: number;
  dateBirth: string;
  password: string;
  company: string;
  position: string;
  taxNumber: string;
  businessType: number;
}

export interface UserDataEx {
  email: string;
  password: string;
}

export interface UserData {
  accountId: number;
  name: string;
  email: string;
  phone: string;
  dateCreate: string;
  address: string;
  citizenCard: string;
  status: string;
  roleId: number;
  gender: number;
}
