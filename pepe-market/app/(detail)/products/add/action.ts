"use server";

import PrismaDB from "@/lib/db";
import { redirect } from "next/navigation";
import getSession from "@/lib/session/getSession";
import { productSchema } from "./schema";

export async function uploadProduct(formData: FormData) {
    const data = {
        photo: formData.get("photo"),
        title: formData.get("title"),
        price: formData.get("price"),
        description: formData.get("description"),
    };

    if (data.photo instanceof File) {
        const photoData = await data.photo.arrayBuffer();
    }

    const result = productSchema.safeParse(data);

    if (!result.success) {
        return result.error.flatten();
    } else {
        const session = await getSession();
        if (session.id) {
            const product = await PrismaDB.product.create({
                data: {
                    title: result.data.title,
                    photo: result.data.photo,
                    price: result.data.price,
                    description: result.data.description,
                    user: {
                        connect: {
                            id: session.id,
                        },
                    },
                },
                select: {
                    id: true,
                },
            });

            redirect(`/products/${product.id}`);
        }
    }
}

export async function getImageUploadURL2CF() {
    const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v2/direct_upload`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.CF_TOKEN}`,
            },
        }
    );

    const data = await response.json();
    return data;
}
