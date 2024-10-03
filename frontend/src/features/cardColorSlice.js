import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleFetchCardColor } from "../services/cardColorApi";

const initialValue = {
  cardColor: [],
  status: "idle",
  error: null,
};

const fetchCardColorData = createAsyncThunk(
  "cardColor/fetchCardColor",
  async () => {
    try {
      const response = await handleFetchCardColor();
      return response;
    } catch (error) {
      console.log("Error fetching data from axios (redux-slice)", error);
    }
  }
);

const cardColorSlice = createSlice({
  name: "cardColor",
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardColorData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCardColorData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cardColor = action.payload;
      })
      .addCase(fetchCardColorData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export { fetchCardColorData };
export default cardColorSlice.reducer;
