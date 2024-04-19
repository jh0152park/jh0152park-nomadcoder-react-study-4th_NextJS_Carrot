"use server";

import PrismaDB from "@/lib/db";

export async function getMoreProducts(page: number) {
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
        skip: page * 1,
        take: 1,
    });

    return products;
}
