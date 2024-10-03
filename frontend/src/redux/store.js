import { configureStore } from "@reduxjs/toolkit";
import canisterReducer from "../features/canisterSlice";
import locationReducer from "../features/locationSlice";
import groupReducer from "../features/groupSlice";
import userReducer from "../features/userSlice";
import cardColorReducer from "../features/cardColorSlice";

export const store = configureStore({
  reducer: {
    canister: canisterReducer,
    location: locationReducer,
    group: groupReducer,
    user: userReducer,
    cardColor: cardColorReducer,
  },
});
