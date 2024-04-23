export default function Loading() {
    return (
        <div className="flex flex-col gap-5 p-5 animate-pulse">
            {[...Array(10)].map((_, index) => (
                <div className="*:rounded-md flex gap-5 ">
                    <div className=" bg-neutral-700 size-28" />
                    <div className="flex flex-col gap-2 *:rounded-md">
                        <div className="w-40 h-5 bg-neutral-700" />
                        <div className="w-20 h-5 bg-neutral-700" />
                        <div className="w-10 h-5 bg-neutral-700" />
                    </div>
                </div>
            ))}
        </div>
    );
}
