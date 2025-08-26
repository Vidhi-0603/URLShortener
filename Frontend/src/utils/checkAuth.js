import { getCurrentUser } from "../api/auth.api.js";
import { loginSuccess } from "../store/slice/authSlice.js";
import { redirect } from "@tanstack/react-router";

export const checkAuth = async ({context}) => {
    try {
        const { queryClient, store } = context;
        const user = await queryClient.ensureQueryData({
            queryKey: ["currentUser"],
            queryFn: getCurrentUser,
        })
        console.log(user,"from checkAuth");
        
        if (!user) return false;
        store.dispatch(loginSuccess({user}))
        const { isloggedIn } = store.getState().auth;

        if (!isloggedIn) return false;
        return true;
        
    } catch(error) {
        console.log(error);
        return redirect({to: "/auth",})
    }
}