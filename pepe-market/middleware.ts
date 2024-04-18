import { NextRequest } from "next/server";
import getSession from "./lib/session";

export async function middleware(request: NextRequest) {
    switch (request.nextUrl.pathname) {
        case "/profile":
            const session = await getSession();
            return Response.redirect(new URL("/", request.url));
    }
}
