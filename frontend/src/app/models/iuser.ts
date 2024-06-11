export interface IUser {
  firstName: string;
  lastName: string;
  address: string;
  emil: string;
  password: string;
  cpassword: string;
  type: boolean;
  clinicAddress?: string;
  phoneNo?: string;
  workHours?: any[];
}
