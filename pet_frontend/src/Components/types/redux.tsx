import type { AuthState } from "../../redux/authSlice";
import type { PetState } from "../../redux/petSlice";
import type { RescueCenterState } from "../../redux/rescueCenterSlice";



export interface ReduxState {
    auth: AuthState,
    rescueCenter: RescueCenterState,
    pet: PetState,
}