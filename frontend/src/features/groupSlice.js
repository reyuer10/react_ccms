import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGroupData } from "../services/groupApi";

const initialValue = {
  group: [],
  status: "idle",
  error: null,
};

const fetchGroupData = createAsyncThunk("group/fetchGroup", async () => {
  try {
    const response = await getGroupData();
    return response.data;
  } catch (error) {
    console.log("Error fetching data from group", error);
  }
});

const groupSlice = createSlice({
  name: "group",
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchGroupData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.group = action.payload;
      })
      .addCase(fetchGroupData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export { fetchGroupData };
export default groupSlice.reducer;
