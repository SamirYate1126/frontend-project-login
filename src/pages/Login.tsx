import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUserRequest } from "../api/userRequest.ts";
import {useEffect, useState } from "react";
import Input from "../components/Input";
import StatusLogin from "../components/StatusLogin";
import ReCAPCHA from "react-google-recaptcha";


const Login = () => {
  const [stateProcess, setStateProcess] = useState<"INACTIVE" | "ACCEPTED" | "DENIED">("INACTIVE");
  const [captcha, setCaptcha] = useState<string | null>();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    if(!captcha) return;
    try {
      const res = await loginUserRequest({...values, captcha});
      console.log(res)
      if (res?.status == 200) {
        setStateProcess("ACCEPTED");
        const role = res.data.role.toLowerCase();
        navigate("/" + role);
        console.log(res)
        
      }else{
        setStateProcess("DENIED");
      }
      setTimeout(() => {
        setStateProcess("INACTIVE");
      }
      , 3000);
      
    } catch (error) {
      console.log(error)
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
        onSubmit={onSubmit}
      >
        <StatusLogin stateProcess={stateProcess} />
        <fieldset className="flex items-center justify-center w-full gap-5 max-md:gap-1">
          <img
            src="/login.png"
            alt="logo"
            width="100"
            className="max-lg:w-20 max-md:w-16"
          />
          <h1 className="font-bold text-4xl max-lg:text-3xl max-md:text-2xl">
            Inicio de Sesión
          </h1>
        </fieldset>

        <fieldset className="w-full flex flex-col items-start px-4 justify-center gap-2 mt-2">
          <Input htmlFor="email" label="Email" type="email" id="email" placeholder="Email" register={register}/>
          <Input htmlFor="password" label="Contraseña:" type="password" id="password" placeholder="••••••••" register={register}/>
        </fieldset>

        <ReCAPCHA sitekey="6LcioOEqAAAAAOneLleHZ17sIGwaTQ7-Uwe9_PvM"
          onChange={(val) => setCaptcha(val)}
          className="m-4"
        />

        <button
          type="submit"
          className="w-[60%] bg-blue-500 p-3 rounded-md hover:bg-blue-700 text-white font-bold max-md:w-auto cursor-pointer"
          disabled={!captcha}
        >
          Iniciar Sesión
        </button>

        <div className="text-center">
          <Link to="/recovery-password" className="text-blue-500 hover:text-blue-700 font-bold">
            Olvide mi contraseña
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
