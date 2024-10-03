import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { handleGetCanister } from "../services/canisterApi";

const initialValue = {
  canister: [],
  status: "idle",
  error: null,
};

const fetchCanister = createAsyncThunk("canister/fetchCanister", async () => {
  try {
    const response = await handleGetCanister();
    return response.data;
  } catch (error) {
    return isRejectedWithValue(error.response.data);
  }
});

export const canisterSlice = createSlice({
  name: "canister",
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCanister.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCanister.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.canister = action.payload;
      })
      .addCase(fetchCanister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export { fetchCanister };
export default canisterSlice.reducer;
