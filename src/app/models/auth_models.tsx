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

export interface UserData{
  email: string
  password: string
}