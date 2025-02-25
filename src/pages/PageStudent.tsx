import { useState, useEffect } from "react";
import { fetchUserData } from "../lib/fetching.ts";

const PageStudent = () => {
  const [stateUser, setStateUser] = useState(
    "Cargando información de usuario..."
  );

  useEffect(() => {
    fetchUserData(setStateUser, "student");
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <img src="/student.png" alt="admin-photo" width="200px" height="200px" />
      <h1 className="text-blue-400 text-5xl">{stateUser}</h1>
    </div>
  );
};

export default PageStudent;