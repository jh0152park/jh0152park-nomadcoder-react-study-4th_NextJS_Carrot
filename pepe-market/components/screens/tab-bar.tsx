"use client";

import {
    HomeIcon as SolidHomeIcon,
    NewspaperIcon as SolidNesPaperIcon,
    ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
    VideoCameraIcon as SolidVideoCameraIcon,
    UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
    HomeIcon as OutlineHomeIcon,
    NewspaperIcon as OutlineNesPaperIcon,
    ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
    VideoCameraIcon as OutlineVideoCameraIcon,
    UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 grid w-full max-w-screen-sm grid-cols-5 px-5 py-3 mx-auto border-t border-neutral-600 *:text-white">
            <Link
                href="/products"
                className="flex flex-col items-center gap-px "
            >
                {pathname === "/products" ? (
                    <SolidHomeIcon className="size-7" />
                ) : (
                    <OutlineHomeIcon className="size-7" />
                )}
                <span>Home</span>
            </Link>
            <Link href="/life" className="flex flex-col items-center gap-px ">
                {pathname === "/life" ? (
                    <SolidNesPaperIcon className="size-7" />
                ) : (
                    <OutlineNesPaperIcon className="size-7" />
                )}
                <span>Life</span>
            </Link>
            <Link href="/chat" className="flex flex-col items-center gap-px ">
                {pathname === "/chat" ? (
                    <SolidChatIcon className="size-7" />
                ) : (
                    <OutlineChatIcon className="size-7" />
                )}
                <span>Chat</span>
            </Link>
            <Link href="/live" className="flex flex-col items-center gap-px ">
                {pathname === "/live" ? (
                    <SolidVideoCameraIcon className="size-7" />
                ) : (
                    <OutlineVideoCameraIcon className="size-7" />
                )}
                <span>Live</span>
            </Link>
            <Link
                href="/profile"
                className="flex flex-col items-center gap-px "
            >
                {pathname === "/profile" ? (
                    <SolidUserIcon className="size-7" />
                ) : (
                    <OutlineUserIcon className="size-7" />
                )}
                <span>My</span>
            </Link>
        </div>
    );
}
