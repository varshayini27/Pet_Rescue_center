import { createSlice } from "@reduxjs/toolkit";
import type { IRescueCenter } from "../Components/types/RescueCenter";

export interface RescueCenterState {
    rescueCenters: IRescueCenter[],
}

const initialState: RescueCenterState = {
    rescueCenters: [],
};

export const rescueCenterSlice = createSlice({
    name: 'rescueCenter',
    initialState,
    reducers: {
        setRescueCenters(state, action) {
            const { data } = action.payload;
            state.rescueCenters = data;
        },
    }
})

export const { setRescueCenters } = rescueCenterSlice.actions;
export default rescueCenterSlice.reducer;