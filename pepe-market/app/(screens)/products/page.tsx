import ProductList from "@/components/screens/products/product-list";
import PrismaDB from "@/lib/db";
import { Prisma } from "@prisma/client";

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
        take: 1,
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
        </div>
    );
}
