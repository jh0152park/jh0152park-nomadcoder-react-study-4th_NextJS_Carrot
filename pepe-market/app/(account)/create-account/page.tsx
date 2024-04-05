"use client";

import FormInput from "@/components/form-input";
import FormButton from "@/components/form-button";
import SocialLogin from "@/components/social-login";
import Image from "next/image";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";

export default function CreateAccount() {
    const [state, trigger] = useFormState(createAccount, null);

    return (
        <div className="flex flex-col gap-10 px-6 py-8">
            <div className="flex flex-col gap-2 *:font-semibold">
                <h1 className="text-2xl ">Hello!</h1>
                <h2 className="text-xl ">Fill in the form below to join!</h2>
            </div>
            <form action={trigger} className="flex flex-col gap-3 ">
                <FormInput
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    errors={state?.fieldErrors.username}
                />
                <FormInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    errors={state?.fieldErrors.email}
                />
                <FormInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    errors={state?.fieldErrors.password}
                />
                <FormInput
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm password"
                    required
                    errors={state?.fieldErrors.confirm_password}
                />
                <FormButton name="Create account" />
            </form>
            <SocialLogin />
            <div className="flex justify-center w-full">
                <Image
                    src="/images/create-account/pepe_sunglass.png"
                    alt="pepe_sunglass"
                    width={200}
                    height={200}
                />
            </div>
        </div>
    );
}
