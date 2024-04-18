"use server";

import PrismaDB from "@/lib/db";
import {
    PASSWORD_REGEX,
    PASSWORD_MIN_LENGTH,
    PASSWORD_REGEX_ERROR,
} from "@/lib/projectCommon";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import getSession from "@/lib/session";

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

async function isUsernameExist(username: string) {
    const user = await PrismaDB.user.findUnique({
        where: {
            username,
        },
        select: {
            id: true,
        },
    });

    return !Boolean(user);
}

async function isEmailExist(email: string) {
    const user = await PrismaDB.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
        },
    });

    return Boolean(user) === false;
}

const formSchema = z
    .object({
        username: z
            .string({
                invalid_type_error: "Username have to be a string",
                required_error: "Please enter a username",
            })
            .trim()
            .refine(validateUsername, "Included not allowed word")
            .refine(isUsernameExist, "This username already exists"),
        email: z
            .string()
            .email()
            .refine(isEmailExist, "This email already exists"),
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

    const result = await formSchema.safeParseAsync(data);
    if (!result.success) {
        return result.error.flatten();
    } else {
        // check if username already exists
        // check if email already exists
        // hash password
        // save user to db
        // log the user in and redirect user to /home

        // 12 mean is how many times run hash algorithm
        // in this case 12 times
        const hashedPassword = await bcrypt.hash(result.data.password, 12);
        const user = await PrismaDB.user.create({
            data: {
                username: result.data.username,
                email: result.data.email,
                password: hashedPassword,
            },
            select: {
                // we just need only id for detect is user is correct or not
                id: true,
            },
        });

        const session = await getSession();
        session.id = user.id;
        await session.save();
    }
}
