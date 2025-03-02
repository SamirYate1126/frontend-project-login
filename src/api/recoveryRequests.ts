import { FieldValues } from "react-hook-form";
import axiosInstance from "./axiosInstance.ts";

export const forgotRequest = async (data: FieldValues) => {
    try {
        const response = await axiosInstance.post('/forgot-password', data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const resetPasswordRequest = async (data:FieldValues) => {
    try{
        const response = await axiosInstance.post('/reset-password', data);
        return response;
    }catch(error){
        console.log(error);
    }
}
