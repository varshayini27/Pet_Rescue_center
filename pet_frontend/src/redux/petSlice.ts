import { createSlice } from "@reduxjs/toolkit";
import type { IPet } from "../Components/types/Pets";

export interface PetState {
    pets: IPet[],
}

const initialState: PetState = {
    pets: [],
};

export const petSlice = createSlice({
    name: 'pet',
    initialState,
    reducers: {
        setAllPets(state, action) {
            const { data } = action.payload;
            state.pets = data;
        },
        setPetsByRescueCenter(state, action) {
            const { data } = action.payload;
            state.pets = data;
        },
    }
})

export const { setAllPets,setPetsByRescueCenter } = petSlice.actions;
export default petSlice.reducer;