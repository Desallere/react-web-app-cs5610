// enrollmentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "./Database"; // Importing db to use its data directly

interface enrollment {
  _id: string;
  user: string;
  course: string;
}

interface enrollmentState {
  enrollments: enrollment[];
}

// Initialize enrollments from db
const initialState: enrollmentState = {
  enrollments: db.enrollments || [], // Fallback to empty array if db.enrollments is undefined
};

export const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action: PayloadAction<enrollment[]>) => {
      state.enrollments = action.payload;
    },
    addEnrollment: (state, action: PayloadAction<enrollment>) => {
      state.enrollments.push(action.payload);
    },
    removeEnrollment: (state, action: PayloadAction<string>) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) => enrollment._id !== action.payload
      );
    },
  },
});
console.log("db.enrollments:", db.enrollments);

export const { setEnrollments, addEnrollment, removeEnrollment } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
