"use client";

import { useState } from "react";
import ProductSummary from "./product-summary";
import { TInitiateProduct } from "@/app/(screens)/products/page";
import { getMoreProducts } from "@/app/(screens)/products/action";

interface IInitialProducts {
    initialProducts: TInitiateProduct;
}

export default function ProductList({ initialProducts }: IInitialProducts) {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState(initialProducts);

    async function oMoreClick() {
        setIsLoading(true);
        const newProducts = await getMoreProducts(1);
        setProducts((prev) => [...prev, ...newProducts]);
        setIsLoading(false);
    }

    return (
        <div className="flex flex-col gap-5 p-5">
            {products.map((product) => (
                <ProductSummary key={product.id} {...product} />
            ))}
            <button
                onClick={oMoreClick}
                disabled={isLoading}
                className="px-3 py-2 mx-auto text-sm font-semibold transition-all bg-green-500 rounded-md w-fit hover:opacity-90 active:scale-95 disabled:bg-gray-500"
            >
                {isLoading ? "loading" : "more"}
            </button>
        </div>
    );
}
