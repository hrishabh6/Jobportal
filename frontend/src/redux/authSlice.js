import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null, // Set the initial user state to null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload; // Set the full user object
        },
    },
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;

