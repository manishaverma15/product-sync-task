import { createAsyncThunk } from '@reduxjs/toolkit'
import { setLoginError, setLoginLoading, setLoginSuccess, setUser, setUserError, setUserLoading } from './userSlice';
import { LocalStorageService } from '@/lib/services/LocalStorage';
import { LocalStorageKeys } from '@/lib/services/constants';

  export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (data: { email: string, password: string }, { dispatch }) => {
      try {
        dispatch(setLoginLoading());
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          body: JSON.stringify(data),
        });

        const result: { user: User, token: string, message?: string } = await response.json();
        dispatch(setLoginSuccess(result.user));
        LocalStorageService.setItem(LocalStorageKeys.UserToken, result.token);
      } catch (err: any) {
        dispatch(setLoginError(err.data.message as string));
      }
    },
  )
export const getUser = createAsyncThunk(
  'users/getUser',
  async (_, { dispatch }) => {
    try {
      const token = LocalStorageService.getUserToken();

      dispatch(setUserLoading());
      const response = await fetch("http://localhost:3000/api/user", {
        method: "Get",
        headers: {
          Authorization: `Bearer: ${token}`
        }
      });

      const result: { user: User } = await response.json();
      dispatch(setUser(result.user));
    } catch (err: any) {
      dispatch(setUserError());
    }
  },
)
