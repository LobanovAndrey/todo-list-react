
import { createAsyncThunk } from "@reduxjs/toolkit"
import { database } from "firebase.js";
import { child, get, ref, set, update } from "firebase/database";
import { initialUserState } from "store/slices/userSlice";
import { IUser } from "entities/IUser";
import { USER_PATH } from "store/consts";

export const fetchUserFromDB = async (): Promise<IUser> => {
  try {
    const snapshot = await get(child(ref(database), USER_PATH));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log('Not existing user data')
      return initialUserState;
    }
  } catch (err) {
    console.log('Cant fetch user data:', err);
    return initialUserState;
  };
};

export const setUser = createAsyncThunk('user/setUser',
  async (payload: IUser): Promise<IUser> => {
  try {
    await set(ref(database, USER_PATH), payload);
    console.log('User data updated successfully');
    return payload;
  } catch (err) {
    console.log('Error! Cant set user:', err);
    throw new Error('Cant set user');
  }
});

export const removeUser = createAsyncThunk('user/removeUser', async () => {
  try {
    await update(ref(database, USER_PATH), initialUserState);
    console.log('User data removed successfully');
  } catch (err) {
    console.log('Error! Cant remove user:', err);
    throw new Error('Cant remove user');
  }
});