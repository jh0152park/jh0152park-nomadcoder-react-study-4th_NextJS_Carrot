"use client";

import Image from "next/image";
import Input from "@/components/input";
import Button from "@/components/button";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { onSubmit } from "./actions";

export default function Login() {
    const [state, trigger] = useFormState(onSubmit, null);

    return (
        <div className="flex flex-col gap-10 px-6 py-8">
            <div className="flex flex-col gap-2 *:font-semibold">
                <h1 className="text-2xl ">Hello!</h1>
                <h2 className="text-xl ">Log in with email and password!</h2>
            </div>
            <form action={trigger} className="flex flex-col gap-3 ">
                <Input name="email" type="email" placeholder="Email" required />
                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                />
                <Button name="Login" />
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
