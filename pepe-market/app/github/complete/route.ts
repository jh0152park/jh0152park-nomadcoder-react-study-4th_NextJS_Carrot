import PrismaDB from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get("code");
    if (!code) {
        return notFound();
    }

    let accessTokenURL = "https://github.com/login/oauth/access_token";
    const accessTokenParams = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET_KEY!,
        code: code,
    }).toString();
    accessTokenURL = `${accessTokenURL}?${accessTokenParams}`;

    const { error, access_token } = await (
        await fetch(accessTokenURL, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        })
    ).json();

    if (error) {
        return new Response(null, {
            status: 400,
        });
    }

    const userProfileResponse = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        cache: "no-cache",
    });
    const { login, id, avatar_url } = await userProfileResponse.json();
    const user = await PrismaDB.user.findUnique({
        where: {
            github_id: id + "",
        },
        select: {
            id: true,
        },
    });

    // not a create account, just visit again
    if (user) {
        const session = await getSession();
        session.id = user.id;
        await session.save();
        return redirect("/profile");
    }

    const isExistUserName = Boolean(
        await PrismaDB.user.findUnique({
            where: {
                username: login,
            },
            select: {
                id: true,
            },
        })
    );

    const newUser = await PrismaDB.user.create({
        data: {
            github_id: id + "",
            profile_photo: avatar_url,
            username: isExistUserName ? `${login}-gh` : login,
        },
        select: {
            id: true,
        },
    });

    const session = await getSession();
    session.id = newUser.id;
    await session.save();
    return redirect("/profile");
}
