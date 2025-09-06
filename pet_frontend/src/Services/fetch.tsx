import type { Dispatch } from "@reduxjs/toolkit";
import Http from "../tools/Http";
import { API_ROUTES } from "../Utils/api_routes";
import { showToastError } from "../Components/Commen/TostifyNotification";
import { setRescueCenters } from "../redux/rescueCenterSlice";
import { setAllPets, setPetsByRescueCenter } from "../redux/petSlice";

export const fetchRescueCenters = async (dispatch: Dispatch, searchParams?: URLSearchParams) => {
    const params = searchParams ?? new URLSearchParams();
    params.append('searchKey', 'name');
    try {
        
        const response = await Http.get(`${API_ROUTES.RESCUECENTER}?${params.toString()}`);
        const data = response.data;
        console.log({ data });
            dispatch(
                setRescueCenters({
                    data: data.data,
                })
            );
        return data.data;
    } catch (error: any) {
        showToastError(error.toString() || "Failed to fetch rescue centers");
    }
};
//not compleate
export const fetchAllPets = async (dispatch: Dispatch, searchParams?: URLSearchParams) => {
    const params = searchParams ?? new URLSearchParams();
    params.append('searchKey', 'name');
    try {
        
        const response = await Http.get(`${API_ROUTES.PETS}?${params.toString()}`);
        const data = response.data;
        console.log({ data });
            dispatch(
                setAllPets({
                    data: data.data,
                })
            );
        return data.data;
    } catch (error: any) {
        showToastError(error.toString() || "Failed to fetch All Pets");
    }
};
//not compleate
export const fetchAllPetsByRescueCenter = async (dispatch: Dispatch,centerId:string, searchParams?: URLSearchParams) => {
    const params = searchParams ?? new URLSearchParams();
    params.append('searchKey', 'name');
    try {
        
        const response = await Http.get(`${API_ROUTES.PETS}/by-center/${centerId}?${params.toString()}`);
        const data = response.data;
        console.log({ data });
            dispatch(
                setPetsByRescueCenter({
                    data: data.data,
                })
            );
        return data.data;
    } catch (error: any) {
        showToastError(error.toString() || "Failed to fetch Pets");
    }
};