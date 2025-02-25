
import { useState, useEffect } from "react";
import { fetchUserData } from "../lib/fetching.ts";

const PageAdmin = () => {
    const [stateUser, setStateUser] = useState(
        "Cargando información de usuario..."
      );
    
      useEffect(() => {
        fetchUserData(setStateUser, "admin");
      }, []);

    return (
        <div className="h-screen w-screen flex justify-center items-center flex-col">
          <img src="/admin.png" alt="admin-photo" width="200px" height="200px"/>
          <h1 className="text-orange-400 text-5xl">{stateUser}</h1>
        </div>
    );
}

export default PageAdmin;