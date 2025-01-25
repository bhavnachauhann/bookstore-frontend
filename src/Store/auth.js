

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: !!localStorage.getItem("token"), // Check if token exists in localStorage
    role: localStorage.getItem("role") || "user", // Get role from localStorage or default to "user"
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.role = "user"; // Reset role on logout
            // Clear localStorage on logout
            localStorage.removeItem("id");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        },
        changeRole(state, action) {
            const role = action.payload;
            state.role = role;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
