import Image from "next/image";
import Link from "next/link";

interface IProductList {
    id: number;
    title: string;
    price: number;
    photo: string;
    created_at: Date;
}

export default function ProductList({
    id,
    title,
    price,
    photo,
    created_at,
}: IProductList) {
    return (
        <Link href={`/products/${id}`} className="flex gap-5">
            <div>
                <div className="relative overflow-hidden rounded-md size-28">
                    <Image src={photo} alt={title} fill />
                </div>
            </div>
            <div className="flex flex-col gap-1 *:text-[ghostwhite]">
                <span className="text-lg">{title}</span>
                <span className="text-sm text-neutral-500">
                    {created_at.toString()}
                </span>
                <span className="text-lg font-semibold">{price}</span>
            </div>
        </Link>
    );
}
