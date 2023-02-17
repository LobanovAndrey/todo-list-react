import { createSlice } from '@reduxjs/toolkit';
import { IUser } from 'entities/IUser';
import { removeUser, setUser } from 'store/actions/user.actions';
import { USER_PATH } from 'store/consts';

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
    error: '',
  },
  reducers: {
    toogleUserLoading (state) {
      state.loading = !state.loading;
    },
    setUserInStore (state, action) {
      console.log('USER SET IN STORE', action.payload);
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    // SET USER
    builder.addCase(setUser.pending, (state) => {
      console.log('USER SET PENDEING');
      state.loading = true;
    });
    builder.addCase(setUser.fulfilled, (state, action) => {
      console.log('USER SET FULLFILLED', action.payload);
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(setUser.rejected, (state, action) => {
      state.loading = false;
      state.data = initialUserState;
      state.error = action.error.message ?? 'Something went wrong';
    });

    // REMOVE USER
    builder.addCase(removeUser.pending, (state) => {
      console.log('USER REMOVE PENDING');
      state.loading = true;
    });
    builder.addCase(removeUser.fulfilled, (state) => {
      console.log('USER REMOVE FULLFILLED');
      state.loading = false;
      state.data = initialUserState;
      state.error = '';
    });
    builder.addCase(removeUser.rejected, (state, action) => {
      state.loading = false;
      state.data = initialUserState;
      state.error = action.error.message ?? 'Something went wrong';
    });
  },
})

export const { setUserInStore, toogleUserLoading } = userSlice.actions;
export default userSlice.reducer;