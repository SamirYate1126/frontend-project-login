const StatusLogin = ({ stateProcess }: { stateProcess: string }) => {
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
        ? "Credenciales Correctas"
        : stateProcess === "DENIED"
        ? "Credenciales Incorrectas"
        : ""}
    </div>
  );
};

export default StatusLogin;
