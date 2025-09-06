import { createSlice } from "@reduxjs/toolkit";
import type { IRescueCenter } from "../Components/types/RescueCenter";


export interface AuthState {
    rescueCenter:IRescueCenter | null
    rescueCenterId: string | null,
    token: string | null,
    role: string | null,
    [key: string]: number | null | string | object | any;
}

const initialState: AuthState = {
    rescueCenter: null,
    rescueCenterId: null,
    token: null,
    role: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action) {
            const { rescueCenter,rescueCenterId, token, role } = action.payload;
            state.rescueCenterId = rescueCenterId;
            state.rescueCenter = rescueCenter;
            state.token = token;
            state.role= role;
        },
        setRescueCenter(state, action) {    
            const { rescueCenter } = action.payload;
            state.rescueCenter = rescueCenter;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        setRole(state, action) {
            state.role = action.payload;
        },
        setUserId(state, action) {
            state.staff_id = action.payload;
        },
        clearAuth(state) {
            state.user = null;
            state.token = null;
        },
    }
})

export const { setAuth, setRescueCenter, setToken, clearAuth,setRole} = authSlice.actions;
export default authSlice.reducer;