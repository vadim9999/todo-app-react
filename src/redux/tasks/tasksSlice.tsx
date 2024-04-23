import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { TasksState } from "./tasksSlice.types";

const initialState: TasksState = {
  tasks: [],
};

const stationSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TasksState["tasks"]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { setTasks } = stationSlice.actions;

export default stationSlice.reducer;
