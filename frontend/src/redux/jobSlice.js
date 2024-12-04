import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allJobs: [], // Ensure this property exists
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
  },
});

export const { setAllJobs } = jobSlice.actions;
export default jobSlice.reducer;
