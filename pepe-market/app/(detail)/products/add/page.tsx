"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { uploadProduct } from "./action";
import { useFormState } from "react-dom";

export default function AddProduct() {
    const [preview, setPreview] = useState("");
    const [state, trigger] = useFormState(uploadProduct, null);

    function onImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;

        const file = event.target.files[0];

        if (file.size > 4 * 1024 * 1024) {
            alert("Please the size of image should be less than 4MB");
            return;
        }

        const fileURL = URL.createObjectURL(file);
        setPreview(fileURL);
    }

    return (
        <div>
            <form action={trigger} className="flex flex-col gap-5 p-5">
                <label
                    htmlFor="photo"
                    className="flex flex-col items-center justify-center bg-center bg-cover border-2 border-dashed rounded-md cursor-pointer aspect-square text-neutral-300 border-neutral-300"
                    style={{
                        backgroundImage: `url(${preview})`,
                    }}
                >
                    {!preview && (
                        <>
                            <PhotoIcon className="w-20 " />
                            <div className="text-sm text-neutral-400">
                                Add product's photo
                            </div>
                        </>
                    )}
                </label>
                <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    className="hidden"
                    onChange={onImageChange}
                />
                <Input
                    name="title"
                    required
                    placeholder="Name of product"
                    type="text"
                    errors={state?.fieldErrors.title}
                />
                <Input
                    name="price"
                    required
                    placeholder="Price of product"
                    type="number"
                    errors={state?.fieldErrors.price}
                />
                <Input
                    name="description"
                    required
                    placeholder="Description of product"
                    type="text"
                    errors={state?.fieldErrors.description}
                />
                <Button name="Done" />
            </form>
        </div>
    );
}
