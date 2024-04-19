import { PhotoIcon } from "@heroicons/react/24/solid";

export default function Loading() {
    return (
        <div className="flex flex-col gap-5 p-5 animate-pulse">
            <div className="flex items-center justify-center border-4 border-dashed rounded-md aspect-square border-neutral-700 text-neutral-700">
                <PhotoIcon className="h-28" />
            </div>
            <div className="flex items-center gap-2">
                <div className="rounded-full size-14 bg-neutral-700" />
                <div className="flex flex-col gap-1">
                    <div className="w-40 h-5 rounded-md bg-neutral-700" />
                    <div className="w-20 h-5 rounded-md bg-neutral-700" />
                </div>
            </div>
            <div className="h-10 rounded-md w-80 bg-neutral-700" />
        </div>
    );
}
