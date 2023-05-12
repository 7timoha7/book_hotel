import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GlobalError,
  GlobalSuccess,
  LoginMutation,
  RegisterMutation,
  RegisterResponse,
  User,
  ValidationError,
} from '../../types';
import { isAxiosError } from 'axios';
import { unsetUser } from './usersSlice';
import axiosApi from '../../axiosApi';

export const register = createAsyncThunk<User, RegisterMutation, { rejectValue: ValidationError }>(
  'users/register',
  async (registerMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users', registerMutation);
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);

export const login = createAsyncThunk<User, LoginMutation, { rejectValue: GlobalError }>(
  'users/login',
  async (loginMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  },
);

export const logout = createAsyncThunk('users/logout', async (_, { dispatch }) => {
  await axiosApi.delete('/users/sessions');
  dispatch(unsetUser());
});

export const getAdmins = createAsyncThunk<User[]>('users/getAdmins', async () => {
  try {
    const responseAdmins = await axiosApi.get<User[]>('/users/admins');
    return responseAdmins.data;
  } catch {
    throw new Error();
  }
});

export const getUsers = createAsyncThunk<User[], string>('users/getMatched', async (match) => {
  try {
    const responseUsers = await axiosApi.get<User[]>('/users/getMatched?' + match);
    return responseUsers.data;
  } catch {
    throw new Error();
  }
});

interface changeProps {
  addHotel?: string;
  deleteHotel?: string;
}

export const changeFavorites = createAsyncThunk<GlobalSuccess, changeProps>('users/changeFavorites', async (data) => {
  try {
    const payload = data.addHotel ? { addHotel: data.addHotel } : { deleteHotel: data.deleteHotel };
    const response = await axiosApi.patch('/users/toggleAddHotelToFavorites', payload);
    return response.data;
  } catch {
    throw new Error();
  }
});

interface statusProps {
  id: string;
  status: string;
}

export const changeStatus = createAsyncThunk<void, statusProps>('users/changeStatus', async ({ status, id }) => {
  try {
    await axiosApi.patch('/users/status/' + id, { status });
  } catch {
    throw new Error();
  }
});

export const reAuthorization = createAsyncThunk<User>('user/reAuthorization', async () => {
  try {
    const response = await axiosApi.post<RegisterResponse>('/users/session/token');
    return response.data.user;
  } catch {
    throw new Error();
  }
});
