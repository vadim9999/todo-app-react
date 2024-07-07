import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { MainState } from "./mainSlice.types";

const initialState: MainState = {
    userInfo: {
        user: null,
        isLoading: true,
    },
};

const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<MainState["userInfo"]>) => {
            state.userInfo = action.payload;
        },
    },
});

export const { setUserInfo } = mainSlice.actions;

export default mainSlice.reducer;
