import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserData } from "../services/userApi";
// import { getLocationData } from "../services/locationApi";

const initialValue = {
  user: [],
  status: "idle",
  error: null,
};

const fetchUserData = createAsyncThunk("user/fetchUser", async () => {
  try {
    const response = await getUserData();
    return response.data;
  } catch (error) {
    console.log("Error fetching data from user redux", error.response.data);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export { fetchUserData };
export default userSlice.reducer;
