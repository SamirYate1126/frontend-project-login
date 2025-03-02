const StatusRecovery = ({ stateProcess }: { stateProcess: string }) => {
    return (
      <div
        className={`h-10 flex justify-center items-center text-white rounded-[10px] w-[50%] ${
          stateProcess === "ACCEPTED"
            ? " bg-green-500"
            : stateProcess === "DENIED"
            ? "bg-red-500"
            : ""
        }`}
      >
        {stateProcess === "ACCEPTED"
          ? "Contraseña recuperada"
          : stateProcess === "DENIED"
          ? "Código Invalido"
          : ""}
      </div>
    );
  };
  
  export default StatusRecovery;
