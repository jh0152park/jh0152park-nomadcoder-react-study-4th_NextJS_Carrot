import { NextRequest } from "next/server";
import getSession from "./lib/session";

export async function middleware(request: NextRequest) {
    const session = await getSession();
    console.log(request.nextUrl.pathname);
    // return Response.redirect(new URL("/", request.url));
}

export const config = {
    matcher: ["/profile"],
};
