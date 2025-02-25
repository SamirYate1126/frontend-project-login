import {FieldValues, UseFormRegister } from "react-hook-form";


const InputRol = ({register} : {register : UseFormRegister<FieldValues>}) => (
  <>
    <label htmlFor="user_role" className="font-bold text-xl max-lg:text-sm">
      Selecciona el rol:
    </label>
    <select
      id="user_role"
      required
      {...register("user_role")}
      className="border-solid border-[1px] border-[gray] text-center rounded-[0.32rem] p-1 w-full m-2"
    >
      <option value="STUDENT">STUDENT</option>
      <option value="TEACHER">TEACHER</option>
      <option value="ADMIN">ADMIN</option>
    </select>
  </>
);

export default InputRol;
