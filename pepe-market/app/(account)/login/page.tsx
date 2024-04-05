"use client";

import Image from "next/image";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-button";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { onSubmit } from "./actions";

export default function Login() {
    const [state, action] = useFormState(onSubmit, null);

    return (
        <div className="flex flex-col gap-10 px-6 py-8">
            <div className="flex flex-col gap-2 *:font-semibold">
                <h1 className="text-2xl ">Hello!</h1>
                <h2 className="text-xl ">Log in with email and password!</h2>
            </div>
            <form action={action} className="flex flex-col gap-3 ">
                <FormInput
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    errors={[]}
                />
                <FormInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    errors={state?.errors ?? []}
                />
                <FormButton name="Login" loading={false} />
            </form>
            <SocialLogin />
            <div className="flex justify-center w-full">
                <Image
                    src="/images/login/pepe_gatsby.png"
                    alt="pepe_gatsby"
                    width={200}
                    height={200}
                />
            </div>
        </div>
    );
}
