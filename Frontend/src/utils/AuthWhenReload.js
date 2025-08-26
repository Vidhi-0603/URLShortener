import { getCurrentUser } from "../api/auth.api.js";
import { loginSuccess, logout } from "../store/slice/authSlice.js";

export const AuthOnReload = async (store) => {
  try {
    const { user } = await getCurrentUser(); // calls /api/auth/me
    if (user) {
      store.dispatch(loginSuccess({ user })); // mark logged in
    }
  } catch (err) {
    console.log(err);;  
    store.dispatch(logout()); // not logged in
  }
};
