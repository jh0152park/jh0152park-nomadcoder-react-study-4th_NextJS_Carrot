"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { getImageUploadURL2CF, uploadProduct } from "./action";
import { useFormState } from "react-dom";

export default function AddProduct() {
    const [preview, setPreview] = useState("");
    const [imageId, setImageId] = useState();
    const [uploadURL, setUploadURL] = useState("");
    const [state, trigger] = useFormState(converImageURLAction, null);

    async function onImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;

        const file = event.target.files[0];

        if (file.size > 4 * 1024 * 1024) {
            alert("Please the size of image should be less than 4MB");
            return;
        }

        const fileURL = URL.createObjectURL(file);
        setPreview(fileURL);

        const response = await getImageUploadURL2CF();
        if (response.success) {
            const id = response.result.id;
            const uploadURL = response.result.uploadURL;
            setImageId(id);
            setUploadURL(uploadURL);
        }
        console.log(response);
    }

    async function converImageURLAction(prevState: any, formData: FormData) {
        const image = formData.get("photo");
        if (!image) return;

        // uplaod image to CF and replace photo to iamge url string
        // then call uploadProduct function
        const cloudFlareForm = new FormData();

        cloudFlareForm.append("file", image);
        const response = await fetch(uploadURL, {
            method: "POST",
            body: cloudFlareForm,
        });

        if (response.status !== 200) {
            // something went wrong
            return;
        }

        const photoURL = `https://imagedelivery.net/YgDzKoC5M4EUjo9dkUT0aQ/${imageId}`;
        formData.set("photo", photoURL);
        return uploadProduct(prevState, formData);
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
