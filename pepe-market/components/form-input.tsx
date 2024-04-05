interface IFormInputProps {
    type: string;
    placeholder: string;
    required: boolean;
    errors?: string[];
    name: string;
}

export default function FormInput({
    type,
    placeholder,
    required,
    errors = [],
    name,
}: IFormInputProps) {
    return (
        <div className="flex flex-col gap-2">
            <input
                className="w-full h-10 transition bg-transparent border-none rounded-md focus:outline-none ring-1 focus:ring-4 ring-neutral-200 focus:ring-green-500 placeholder:text-neutral-400"
                type={type}
                placeholder={placeholder}
                required={required}
                name={name}
            />
            {errors.map((error, index) => (
                <span key={index} className="font-medium text-red-500 ">
                    {error}
                </span>
            ))}
        </div>
    );
}
