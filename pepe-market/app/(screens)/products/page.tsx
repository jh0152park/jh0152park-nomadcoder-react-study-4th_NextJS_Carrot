import ProductList from "@/components/screens/products/product-list";
import PrismaDB from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import Link from "next/link";

async function getInitialProducts() {
    const products = await PrismaDB.product.findMany({
        select: {
            id: true,
            title: true,
            price: true,
            photo: true,
            created_at: true,
        },
        orderBy: {
            created_at: "desc",
        },
        // take: 1,
    });

    return products;
}

export type TInitiateProduct = Prisma.PromiseReturnType<
    typeof getInitialProducts
>;

export default async function Products() {
    const initialProducts = await getInitialProducts();

    return (
        <div>
            <ProductList initialProducts={initialProducts} />
            <Link
                href="/products/add"
                className="flex items-center justify-center bg-green-500 rounded-full size-14 fixed bottom-24 right-8 text-[ghostwhite] transition-colors hover:bg-green-600"
            >
                <PlusIcon className="size-10" />
            </Link>
        </div>
    );
}
