import Link from "next/link";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-button";

export default function CreateAccount() {
    return (
        <div className="flex flex-col gap-10 px-6 py-8">
            <div className="flex flex-col gap-2 *:font-semibold">
                <h1 className="text-2xl ">Hello!</h1>
                <h2 className="text-xl ">Fill in the form below to join!</h2>
            </div>
            <form className="flex flex-col gap-3 ">
                <FormInput
                    type="text"
                    placeholder="Username"
                    required
                    errors={[]}
                />
                <FormInput
                    type="email"
                    placeholder="Email"
                    required
                    errors={[]}
                />
                <FormInput
                    type="password"
                    placeholder="Password"
                    required
                    errors={[]}
                />
                <FormInput
                    type="password"
                    placeholder="Confirm password"
                    required
                    errors={[]}
                />
                <FormButton name="Create account" loading={false} />
            </form>
            <div className="w-full h-px bg-neutral-500" />
            <div>
                <Link
                    href="/sms"
                    className="flex items-center justify-center h-10 gap-3 primary-button"
                >
                    <span>
                        <ChatBubbleOvalLeftEllipsisIcon className="size-6" />
                    </span>
                    <span>Sign up with SMS</span>
                </Link>
            </div>
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
