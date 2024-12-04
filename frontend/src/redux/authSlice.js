import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null, // Fetch user from localStorage if exists
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;  // Set the full user object
            // Persist the full user object in localStorage
            if (action.payload) {
                localStorage.setItem("userData", JSON.stringify(action.payload));
            } else {
                localStorage.removeItem("userData"); // Remove user data from localStorage when logged out
            }
        },
    },
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
