"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

const phoneSchema = z
    .string()
    .trim()
    .refine(
        (phone) => validator.isMobilePhone(phone, "ko-KR"),
        "Wroung phone number format"
    );
const tokenSchema = z.coerce.number().min(100000).max(999999);

interface IActionState {
    token: boolean;
}

export async function SMSVerification(
    prevState: IActionState,
    formData: FormData
) {
    const phone_number = formData.get("phone_number");
    const token = formData.get("token");

    console.log(`phone number is ${phone_number}`);

    if (!prevState.token) {
        // current user puted a phone number
        const result = phoneSchema.safeParse(phone_number);
        console.log(result);
        if (!result.success) {
            return {
                token: false,
                error: result.error.flatten(),
            };
        }
        return { token: true };
    } else {
        // current user puted a token
        const result = tokenSchema.safeParse(token);
        if (!result.success) {
            return {
                token: true,
                error: result.error.flatten(),
            };
        }
        // redirect user to somewhere
        redirect("/");
    }
}
