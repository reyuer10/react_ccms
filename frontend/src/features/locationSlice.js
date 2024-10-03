import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocationData } from "../services/locationApi";

const initialValue = {
  location: [],
  status: "idle",
  error: null,
};

const fetchLocationData = createAsyncThunk(
  "location/fetchLocation",
  async () => {
    try {
      const response = await getLocationData();
      return response.data;
    } catch (error) {
      console.log("Error fetching data from location.", error.response.data);
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLocationData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.location = action.payload;
      })
      .addCase(fetchLocationData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export { fetchLocationData };
export default locationSlice.reducer;
