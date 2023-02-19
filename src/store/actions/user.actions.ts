import { createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "firebase.js";
import { child, get, ref, remove, set } from "firebase/database";
import { initialUserState } from "store/slices/userSlice";
import { IUser } from "entities/IUser";
import { USER_PATH } from "store/consts";
import {
  getCurrentUserUid,
  removeCurrentUserUid,
  setCurrentUserUid,
} from "auth/auth.helper";
import { NonNullableFields } from "helpers/types";

export const fetchUserFromDB = async (): Promise<IUser> => {
  const userUid = getCurrentUserUid();
  if (!userUid) {
    return initialUserState;
  }

  try {
    const snapshot = await get(
      child(ref(database), `/${USER_PATH}/${userUid}`)
    );
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("Not existing user data");
      return initialUserState;
    }
  } catch (err) {
    console.log("Cant fetch user data:", err);
    return initialUserState;
  }
};

export const setUser = createAsyncThunk(
  "user/setUser",
  async (payload: NonNullableFields<IUser>): Promise<IUser> => {
    const currentUserUid = getCurrentUserUid();
    if (currentUserUid) {
      removeCurrentUserUid();
    }

    const userUid = payload.id;
    try {
      await set(ref(database, `/${USER_PATH}/${userUid}`), payload);
      setCurrentUserUid(userUid);
      console.log("User add in DB successfully");
      return payload;
    } catch (err) {
      console.log("Error! Cant add user in DB:", err);
      throw new Error("Cant set user to DB");
    }
  }
);

export const removeUser = createAsyncThunk("user/removeUser", async () => {
  try {
    const currentUserUid = getCurrentUserUid();
    if (!currentUserUid) {
      throw new Error("ERROR! No userUid in local storage");
    }
    await remove(ref(database, `/${USER_PATH}/${currentUserUid}`));
    removeCurrentUserUid();
    console.log("User removed from DB successfully");
  } catch (err) {
    console.log("Error! Cant remove user:", err);
    throw new Error("Cant remove user from DB");
  }
});
