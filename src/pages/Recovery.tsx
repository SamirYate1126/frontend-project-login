import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { forgotRequest, resetPasswordRequest } from "../api/recoveryRequests";
import { useState, useEffect } from "react";
import StatusRecovery from "../components/StatusRecovery";

const Recovery = () => {
  const [stateRecovery, setStateRecovery] = useState(false);
  const [stateProcess, setStateProcess] = useState<
    "ACCEPTED" | "DENIED" | "INACTIVE"
  >("INACTIVE");
  const { register, handleSubmit } = useForm();
  const onSubmitForgot = handleSubmit(async (values) => {
    const response = await forgotRequest(values);
    if (response?.status == 200) {
      setStateRecovery(true);
    }
  });

  const onSubmitReset = handleSubmit(async (values) => {
    const response = await resetPasswordRequest(values);
    if (response?.status == 200) {
      setStateProcess("ACCEPTED");
    } else {
      setStateProcess("DENIED");
    }
  });

    useEffect(() => {
      let timeoutId: number | undefined;
      if (stateProcess !== "INACTIVE") {
        timeoutId = setTimeout(() => {
          setStateProcess("INACTIVE");
        }, 3000);
      }
  
      return () => {
        if (timeoutId !== undefined) {
          clearTimeout(timeoutId);
        }
      };
    }, [stateProcess]);

  return (
    <div className="w-full h-screen p-6 flex justify-center bg-gray-50 dark:bg-gray-900 max-lg:p-4">
      <form
        action=""
        className="w-[40%] h-[90%] flex flex-col items-center justify-around p-6 shadow dark:border dark:border-gray-700 rounded-md bg-white max-md:w-auto"
        onSubmit={!stateRecovery ? onSubmitForgot : onSubmitReset}
      >
        <StatusRecovery stateProcess={stateProcess} />
        <fieldset className="flex items-center justify-center w-full gap-5 max-md:gap-1">
          <img
            src="/reset-password.png"
            alt="logo"
            width="100"
            className="max-lg:w-20 max-md:w-16"
          />
          <h1 className="font-bold text-4xl max-lg:text-3xl max-md:text-2xl text-blue-500">
            Recuperación de Contraseña:
          </h1>
        </fieldset>

        <fieldset className="w-full flex flex-col items-start px-4 justify-center gap-2 mt-2">
          {stateRecovery ? (
            <>
              <Input
                htmlFor="code"
                label="Digita el código de recuperación:"
                type="number"
                id="code"
                placeholder="Código"
                register={register}
              />
              <Input
                htmlFor="newPassword"
                label="Nueva Contraseña:"
                type="password"
                id="newPassword"
                placeholder="••••••••"
                register={register}
              />
            </>
          ) : (
            <Input
              htmlFor="email"
              label="Email con el que te registraste:"
              type="email"
              id="email"
              placeholder="Email"
              register={register}
            />
          )}
        </fieldset>

        {!stateRecovery && (
          <p className="text-blue-500 font-bold">
            Se te enviara un código de 6 dígitos a tu correo
          </p>
        )}

        <button
          type="submit"
          className="w-[60%] bg-blue-500 p-3 rounded-md hover:bg-blue-700 text-white font-bold max-md:w-auto cursor-pointer"
        >
          {stateRecovery ? "Restablecer Contraseña" : "Enviar Código"}
        </button>
      </form>
    </div>
  );
};

export default Recovery;
