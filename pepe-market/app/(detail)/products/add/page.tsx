"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function AddProduct() {
    const [preview, setPreview] = useState("");

    function onImageChange() {}

    return (
        <div>
            <form className="flex flex-col gap-5 p-5">
                <label
                    htmlFor="photo"
                    className="flex flex-col items-center justify-center border-2 border-dashed rounded-md cursor-pointer aspect-square text-neutral-300 border-neutral-300"
                >
                    <PhotoIcon className="w-20 " />
                    <div className="text-sm text-neutral-400">
                        Add product's photo
                    </div>
                </label>
                <input
                    type="file"
                    id="photo"
                    name="photo"
                    className="hidden"
                    onChange={onImageChange}
                />
                <Input
                    name="title"
                    required
                    placeholder="Name of product"
                    type="text"
                />
                <Input
                    name="price"
                    required
                    placeholder="Price of product"
                    type="number"
                />
                <Input
                    name="description"
                    required
                    placeholder="Description of product"
                    type="text"
                />
                <Button name="Done" />
            </form>
        </div>
    );
}
