const path = "currentUserUid";

export const getCurrentUserUid = () => sessionStorage.getItem(path);

export const setCurrentUserUid = (uid: string) =>
  sessionStorage.setItem(path, uid);

export const removeCurrentUserUid = () => sessionStorage.removeItem(path);
