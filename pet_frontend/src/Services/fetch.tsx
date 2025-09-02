import type { Dispatch } from "@reduxjs/toolkit";
import Http from "../tools/Http";
import { API_ROUTES } from "../Utils/api_routes";
import { showToastError } from "../Components/Commen/TostifyNotification";
import { setRescueCenter } from "../redux/authSlice";
import { setRescueCenters } from "../redux/rescueCenterSlice";

export const fetchRescueCenters = async (dispatch: Dispatch, searchParams?: URLSearchParams, isDownload: boolean = false) => {
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