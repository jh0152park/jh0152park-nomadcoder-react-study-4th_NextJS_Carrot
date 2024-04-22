"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { getImageUploadURL2CF, uploadProduct } from "./action";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchemaType, productSchema } from "./schema";

export default function AddProduct() {
    const [preview, setPreview] = useState("");
    const [uploadURL, setUploadURL] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ProductSchemaType>({
        resolver: zodResolver(productSchema),
    });

    async function onImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;

        const file = event.target.files[0];

        if (file.size > 4 * 1024 * 1024) {
            alert("Please the size of image should be less than 4MB");
            return;
        }

        const fileURL = URL.createObjectURL(file);
        setPreview(fileURL);
        setImageFile(file);

        const response = await getImageUploadURL2CF();
        if (response.success) {
            const id = response.result.id;
            const uploadURL = response.result.uploadURL;
            const photoURL = `https://imagedelivery.net/YgDzKoC5M4EUjo9dkUT0aQ/${id}`;

            setUploadURL(uploadURL);
            setValue("photo", photoURL);
        }
    }

    const onSubmit = handleSubmit(async (data: ProductSchemaType) => {
        if (!imageFile) return;

        // uplaod image to CF and replace photo to iamge url string
        // then call uploadProduct function
        const cloudFlareForm = new FormData();

        cloudFlareForm.append("file", imageFile);
        const response = await fetch(uploadURL, {
            method: "POST",
            body: cloudFlareForm,
        });

        if (response.status !== 200) {
            // something went wrong
            return;
        }

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("photo", data.photo);
        formData.append("price", data.price + "");
        formData.append("description", data.description);
        const errors = await uploadProduct(formData);
    });

    async function onValid() {
        await onSubmit();
    }

    return (
        <div>
            <form action={onValid} className="flex flex-col gap-5 p-5">
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
                    required
                    placeholder="Name of product"
                    type="text"
                    {...register("title")}
                    errors={[errors.title?.message ?? ""]}
                />
                <Input
                    required
                    placeholder="Price of product"
                    type="number"
                    {...register("price")}
                    errors={[errors.price?.message ?? ""]}
                />
                <Input
                    required
                    placeholder="Description of product"
                    type="text"
                    {...register("description")}
                    errors={[errors.description?.message ?? ""]}
                />
                <Button name="Done" />
            </form>
        </div>
    );
}
