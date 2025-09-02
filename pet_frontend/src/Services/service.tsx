import type { UseFormReset } from "react-hook-form";

export const handleCancel = (setIsEditMode: Function, reset: UseFormReset<any>) => {
    setIsEditMode(false);
    reset();
};

export const handleEdit = (state: any, setIsEditMode: Function, setEditData: Function) => {
    setIsEditMode(true);
    setEditData(state);
};