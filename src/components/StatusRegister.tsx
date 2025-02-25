const StatusRegister = ({ stateProcess }: { stateProcess: string }) => {
    return (
      <div
        className={`h-10 flex justify-center items-center text-white rounded-[10px] w-[50%] ${
          stateProcess === "CREATED"
            ? " bg-green-500"
            : stateProcess === "ERROR"
            ? "bg-red-500"
            : ""
        }`}
      >
        {stateProcess === "CREATED"
          ? "Usuario creado Exitosamente"
          : stateProcess === "ERROR"
          ? "Error al crear el Usuario"
          : ""}
      </div>
    );
  };
  
  export default StatusRegister;
  