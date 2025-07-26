import { createAppSlice } from "@/lib/createAppSlice";
import { PayloadAction } from "@reduxjs/toolkit";

export interface UserSliceState {
  user: User | undefined;
  isLoginLoading: boolean;
  isUserLoading: boolean;
  loginErrorMessage?: string;
}

const initialState: UserSliceState = {
  user: undefined,
  isLoginLoading: false,
  isUserLoading: false,
  loginErrorMessage: '',
};

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: (create) => ({
    setUser: create.reducer((state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isUserLoading = false;
    }),
    setLoginLoading: create.reducer((state) => {
      state.isLoginLoading = true;
    }),
    setUserLoading: create.reducer((state) => {
      state.isUserLoading = true;
    }),
    setUserError: create.reducer(
      (state) => {
        state.isUserLoading = false;
      },
    ),
    setLoginError: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.isLoginLoading = false;
        state.loginErrorMessage = action.payload;
      },
    ),
    setLoginSuccess: create.reducer(
      (state, action: PayloadAction<User>) => {
        state.isLoginLoading = false;
        state.user = action.payload;
      },
    ),
  }),
});

export const { setUser, setLoginError, setLoginLoading, setLoginSuccess, setUserLoading, setUserError } =
  userSlice.actions;
