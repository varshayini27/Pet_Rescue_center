import type { AuthState } from "../../redux/authSlice";
import type { RescueCenterState } from "../../redux/rescueCenterSlice";



export interface ReduxState {
    auth: AuthState,
    rescueCenter: RescueCenterState,
}