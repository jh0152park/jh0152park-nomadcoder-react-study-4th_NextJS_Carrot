"use server";

import {
    PASSWORD_MIN_LENGTH,
    PASSWORD_REGEX,
    PASSWORD_REGEX_ERROR,
} from "@/lib/projectCommon";
import { z } from "zod";

function validateUsername(username: string) {
    const restrictWords = ["master", "admin", "potato", "운영자"];

    for (let word of restrictWords) {
        if (username.includes(word)) return false;
    }
    return true;
}

function validatePassword({
    password,
    confirm_password,
}: {
    password: string;
    confirm_password: string;
}) {
    return password === confirm_password;
}

const formSchema = z
    .object({
        username: z
            .string({
                invalid_type_error: "username have to be a string",
                required_error: "please enter a username",
            })
            .refine(validateUsername, "included not allowed word"),
        email: z.string().email(),
        password: z
            .string()
            .min(PASSWORD_MIN_LENGTH)
            .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
        confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
    })
    .refine(validatePassword, {
        message: "Both password and confirm_password must be the same",
        path: ["confirm_password"],
    });

export async function createAccount(prevState: any, formData: FormData) {
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
    };

    const result = formSchema.safeParse(data);
    if (!result.success) {
        return result.error.flatten();
    } else {
        console.log(result.data);
    }
}
