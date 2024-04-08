"use client";

import Image from "next/image";
import Input from "@/components/input";
import Button from "@/components/button";
import { useFormState } from "react-dom";
import { SNSVerification } from "./actions";

export default function SMSLogin() {
    const [state, trigger] = useFormState(SNSVerification, null);

    return (
        <div className="flex flex-col gap-10 px-6 py-8">
            <div className="flex flex-col gap-2 *:font-semibold">
                <h1 className="text-2xl ">SMS Login</h1>
                <h2 className="text-xl ">Verify your phone number</h2>
            </div>
            <form action={trigger} className="flex flex-col gap-3 ">
                <Input
                    type="number"
                    name="phone_number"
                    placeholder="Phone Number"
                    required
                />
                <Input
                    type="number"
                    name="token"
                    placeholder="Verification Code"
                    required
                />
                <Button name="Verify" />
            </form>
            <div className="flex justify-center w-full">
                <Image
                    src="/images/sms/pepe_phone.png"
                    alt="pepe_phone"
                    width={200}
                    height={200}
                />
            </div>
        </div>
    );
}
