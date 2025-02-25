import {FieldValues, UseFormRegister } from "react-hook-form";

const Input = ({htmlFor, label, type, id, placeholder, register}: InputProps) => {


    return (
        <>
        <label htmlFor={htmlFor} className="font-bold text-xl max-lg:text-sm">
            {label}
        </label>

        <input
            type={type}
            id={id}
            { ...register(id, { required: true })}
            placeholder={placeholder}
            className="border-solid border-[1px] border-[gray] text-center rounded-[0.32rem] p-1 w-full"
            autoComplete={type}
            required
        />

    </>
    )
}

interface InputProps {
    htmlFor: string;
    label: string;
    type: string;
    id: string;
    placeholder: string;
    register: UseFormRegister<FieldValues>;
}

export default Input;