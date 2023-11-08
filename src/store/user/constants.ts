import { IUser } from '@interfaces/user';

export interface IAuth {
  isAuthenticated: boolean;
  user_infos: IUser;
}

export const initialState: IAuth = {
  isAuthenticated: false,
  user_infos: {
    user_id: '',
    address: '',
    city: '',
    country: '',
    created_at: '',
    phone_number: '',
    province: '',
    street: '',
    updated_at: '',
  },
};
