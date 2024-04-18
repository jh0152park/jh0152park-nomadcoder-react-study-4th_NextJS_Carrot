"use server";

import PrismaDB from "@/lib/db";
import {
    PASSWORD_MIN_LENGTH,
    PASSWORD_REGEX,
    PASSWORD_REGEX_ERROR,
} from "@/lib/projectCommon";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const formSchema = z.object({
    email: z
        .string()
        .email()
        .toLowerCase()
        .refine(isEmailExist, "Email dose not exist"),
    password: z
        .string({
            required_error: "Password is required",
        })
        .min(PASSWORD_MIN_LENGTH)
        .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

async function isEmailExist(email: string) {
    const user = await PrismaDB.user.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
        },
    });

    return Boolean(user);
}

export default async function login(prevState: any, formData: FormData) {
    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const result = await formSchema.safeParseAsync(data);
    if (!result.success) {
        return result.error.flatten();
    } else {
        // find a user with email
        // check if the password is correct or not after user is exist
        // log in user and redirect after everything is correct

        const user = await PrismaDB.user.findUnique({
            where: {
                email: result.data.email,
            },
            select: {
                id: true,
                password: true,
            },
        });

        const passwrodCompare = await bcrypt.compare(
            result.data.password,
            user!.password ?? ""
        );

        if (passwrodCompare) {
            const session = await getSession();
            session.id = user!.id;
            redirect("/profile");
        } else {
            // pretending like a zod for avoid type errors at page.tsx
            return {
                fieldErrors: {
                    password: ["Wrong password."],
                    email: [],
                },
            };
        }
    }
}
