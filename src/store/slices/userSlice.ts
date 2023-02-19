import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "entities/IUser";
import { removeUser, setUser } from "store/actions/user.actions";
import { USER_PATH } from "store/consts";

export const initialUserState: IUser = {
  email: null,
  token: null,
  id: null,
};

const userSlice = createSlice({
  name: USER_PATH,
  initialState: {
    data: initialUserState,
    loading: false,
    error: "",
  },
  reducers: {
    resetAuthStatus(state) {
      state.error = "";
      state.loading = false;
    },
    setAuthError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    setAuthPending(state) {
      state.loading = true;
      state.error = "";
    },
    setUserInStore(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    // SET USER
    builder.addCase(setUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(setUser.rejected, (state, action) => {
      state.loading = false;
      state.data = initialUserState;
      state.error = action.error.message ?? "Error! Cant set user";
    });

    // REMOVE USER
    builder.addCase(removeUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeUser.fulfilled, (state) => {
      state.loading = false;
      state.data = initialUserState;
      state.error = "";
    });
    builder.addCase(removeUser.rejected, (state, action) => {
      state.loading = false;
      state.data = initialUserState;
      state.error = action.error.message ?? "Error! Cant remove user";
    });
  },
});

export const {
  setUserInStore,
  setAuthPending,
  resetAuthStatus,
  setAuthError,
} = userSlice.actions;
export default userSlice.reducer;
