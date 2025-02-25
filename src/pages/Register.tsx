import { useForm } from "react-hook-form";
import { registerRequest } from "../api/userRequest.ts";
import { useState, useEffect } from "react";
import { verifyRoleAdminRequest } from "../lib/fetching.ts";
import StatusRegister from "../components/StatusRegister";
import Input from "../components/Input";
import InputRol from "../components/InputRol";

const Register = () => {
  const [stateValidateAdmin, setValidateAdmin] = useState(false);
  const [stateProcess, setStateProcess] = useState<
    "INACTIVE" | "CREATED" | "ERROR"
  >("INACTIVE");
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit(async (values) => {
    try {
      const res = await registerRequest(values);
      if (res?.status == 201) {
        setStateProcess("CREATED");
      } else {
        setStateProcess("ERROR");
      }
    } catch (error) {
      setStateProcess("ERROR");
      console.log(error);
    }
  });

  useEffect(() => {
    verifyRoleAdminRequest()
      .then((isAdmin) => {
        if (isAdmin) {
          setValidateAdmin(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
    <>
      {stateValidateAdmin ? (
        <div className="w-full h-screen p-6 flex justify-center bg-gray-50 dark:bg-gray-900 max-lg:p-4">
          <form
            action=""
            className="w-[40%] h-full flex flex-col items-center justify-around p-6 shadow dark:border dark:border-gray-700 rounded-md bg-white max-md:w-auto"
            onSubmit={onSubmit}
          >
            <StatusRegister stateProcess={stateProcess} />
            <fieldset className="flex items-center justify-center w-full gap-5 max-md:gap-1">
              <img
                src="/login.png"
                alt="logo"
                width="100"
                height="100"
                className="max-lg:w-20 max-md:w-16"
              />
              <h1 className="font-bold text-4xl max-lg:text-3xl max-md:text-2xl">
                Registro Usuario
              </h1>
            </fieldset>

            <fieldset className="w-full flex flex-col items-start px-4 justify-center gap-2 mt-2">
              <Input
                htmlFor="name"
                label="Nombre de Usuario:"
                type="text"
                id="name"
                placeholder="Nombre de Usuario"
                register={register}
              />
              <Input
                htmlFor="email"
                label="Email"
                type="email"
                id="email"
                placeholder="Email"
                register={register}
              />
              <Input
                htmlFor="password"
                label="Contraseña:"
                type="password"
                id="password"
                placeholder="••••••••"
                register={register}
              />

              <InputRol register={register} />
            </fieldset>

            <button
              type="submit"
              className="w-[60%] bg-blue-500 p-3 rounded-md hover:bg-blue-700 text-white font-bold max-md:w-auto"
            >
              Registarse
            </button>
          </form>
        </div>
      ) : (
        <div className="h-screen w-screen flex justify-center items-center flex-col">
          <img
            src="/admin.png"
            alt="admin-photo"
            width="200px"
            height="200px"
          />
          <h1 className="text-orange-400 text-5xl">Validando si tienes permisos de Administrador...</h1>
        </div>
      )}
    </>
  );
};

export default Register;
