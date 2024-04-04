import Image from "next/image";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-button";

export default function SMSLogin() {
    return (
        <div className="flex flex-col gap-10 px-6 py-8">
            <div className="flex flex-col gap-2 *:font-semibold">
                <h1 className="text-2xl ">SMS Login</h1>
                <h2 className="text-xl ">Verify your phone number</h2>
            </div>
            <form className="flex flex-col gap-3 ">
                <FormInput
                    type="number"
                    placeholder="Phone Number"
                    required
                    errors={[]}
                />
                <FormInput
                    type="number"
                    placeholder="Verification Code"
                    required
                    errors={[]}
                />
                <FormButton name="Verify" loading={false} />
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
