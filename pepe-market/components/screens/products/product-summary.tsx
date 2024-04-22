import { FormatToTimeAgo, FormatToWon } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface IProductSummary {
    id: number;
    title: string;
    price: number;
    photo: string;
    created_at: Date;
}

export default function ProductSummary({
    id,
    title,
    price,
    photo,
    created_at,
}: IProductSummary) {
    return (
        <Link href={`/products/${id}`} className="flex gap-5">
            <div>
                <div className="relative overflow-hidden rounded-md size-36">
                    <Image
                        src={`${photo}/profileImage`}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-1 *:text-[ghostwhite]">
                <span className="text-lg">{title}</span>
                <span className="text-sm text-neutral-500">
                    {FormatToTimeAgo(created_at.toString())}
                </span>
                <span className="text-lg font-semibold">
                    ₩ {FormatToWon(price)}
                </span>
            </div>
        </Link>
    );
}
