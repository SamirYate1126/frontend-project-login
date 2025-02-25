import { FieldValues } from "react-hook-form";
import axiosInstance from "./axiosInstance.ts";

export const registerRequest = async (user: FieldValues) => {
    try {
        const token = localStorage.getItem("auth_token");
        const response = await axiosInstance.post("/users/register", user, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }   
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const loginUserRequest = async (user: FieldValues) => {
    try {
        const response = await axiosInstance.post("/users/login", user);
        if(response.status === 200){
            const token = response.data.auth_token;
            localStorage.setItem("auth_token", token);
        }
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const dataUserRequest = async (auth_token: string, role: string) => {
    try {
        const response = await axiosInstance.get("/users/" + role, {
            headers: {
                Authorization: `Bearer ${auth_token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

