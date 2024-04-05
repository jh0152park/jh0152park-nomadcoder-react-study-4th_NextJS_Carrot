"use client";

import { useFormStatus } from "react-dom";

interface IFromButton {
    name: string;
    loading: boolean;
}

export default function FormButton({ name, loading }: IFromButton) {
    const { pending } = useFormStatus();

    return (
        <button
            className="h-10 font-medium primary-button disabled:bg-green-800 disabled:text-gray-400 disabled:cursor-not-allowed"
            disabled={pending}
        >
            {pending ? "Loading" : name}
        </button>
    );
}
