import { dataUserRequest } from "../api/userRequest.ts";

export const fetchUserData = async (
  setStateUser: React.Dispatch<React.SetStateAction<string>>,
  role: string
) => {
  const token = localStorage.getItem("auth_token");
  if (!token) {
    setStateUser("No tienes permiso para acceder a este recurso");
    return;
  }

  try {
    const response = await dataUserRequest(token, role);

    if (response && response.status === 200) {
      setStateUser(response.data.message);
    } else {
      setStateUser("No tienes permiso para acceder a este recurso");
    }
  } catch (error) {
    setStateUser("No tienes permiso para acceder a este recurso");
    console.error("Error fetching user data:", error);
  }
};

export const verifyRoleAdminRequest = async () => {
  const token = localStorage.getItem("auth_token");
  if(!token) return false;
  try {
    const response = await dataUserRequest(token, "admin");
    if(response && response.status === 200){
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}