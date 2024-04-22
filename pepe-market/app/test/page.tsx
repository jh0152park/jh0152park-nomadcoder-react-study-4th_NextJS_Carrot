"use client";

import { useEffect, useRef } from "react";

export default function TEST() {
    const target = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let observer: IntersectionObserver;
        if (target) {
            observer = new IntersectionObserver(
                (items) => {
                    items.forEach((item) => {
                        if (item.isIntersecting) {
                            console.log(item.target, "detected!!");
                        }
                    });
                },
                {
                    threshold: 0.8,
                }
            );

            observer.observe(target.current as Element);
        }
    }, [target]);

    return (
        <div className="w-full h-[300vh] flex flex-col items-center justify-center">
            <div className="bg-green-500 rounded-full size-36" ref={target} />
        </div>
    );
}
