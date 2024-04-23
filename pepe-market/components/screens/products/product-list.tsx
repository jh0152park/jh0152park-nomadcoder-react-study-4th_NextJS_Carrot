"use client";

import { useEffect, useRef, useState } from "react";
import ProductSummary from "./product-summary";
import { TInitiateProduct } from "@/app/(tabs)/products/page";
import { getMoreProducts } from "@/app/(tabs)/products/action";

interface IInitialProducts {
    initialProducts: TInitiateProduct;
}

export default function ProductList({ initialProducts }: IInitialProducts) {
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false);
    const [products, setProducts] = useState(initialProducts);

    const target = useRef<HTMLSpanElement>(null);

    // useEffect(() => {
    //     let observer: IntersectionObserver;
    //     if (target) {
    //         observer = new IntersectionObserver(
    //             async (entries) => {
    //                 if (entries[0].isIntersecting) {
    //                     // detected target
    //                     observer.unobserve(target.current!);
    //                     setIsLoading(true);
    //                     const newProducts = await getMoreProducts(page + 1);
    //                     if (newProducts.length !== 0) {
    //                         setPage((prev) => prev + 1);
    //                         setProducts((prev) => [...prev, ...newProducts]);
    //                         setIsLoading(false);
    //                     } else {
    //                         setIsLastPage(true);
    //                     }
    //                 }
    //             },
    //             {
    //                 threshold: 1.0,
    //             }
    //         );
    //         observer.observe(target.current as Element);
    //     }

    //     return () => {
    //         observer.disconnect();
    //     };
    // }, [page]);

    return (
        <div className="flex flex-col gap-5 p-5">
            {products.map((product) => (
                <ProductSummary key={product.id} {...product} />
            ))}

            {/* {!isLastPage && (
                <span
                    ref={target}
                    style={{
                        marginTop: `${page + 1 * 300}vh`,
                    }}
                    className="mb-[100px] px-3 py-2 mx-auto text-sm font-semibold transition-all bg-green-500 rounded-md w-fit hover:opacity-90 active:scale-95 disabled:bg-gray-500"
                >
                    {isLoading ? "loading" : "more"}
                </span>
            )} */}
        </div>
    );
}
