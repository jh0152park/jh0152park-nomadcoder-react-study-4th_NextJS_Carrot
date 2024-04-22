"use server";

import PrismaDB from "@/lib/db";
import getSession from "@/lib/session/getSession";
import { redirect } from "next/navigation";
import { z } from "zod";

const productSchema = z.object({
    photo: z.string({
        required_error: "Photo is required",
    }),
    title: z.string({
        required_error: "Title is required",
    }),
    description: z.string({
        required_error: "Description is required",
    }),
    price: z.coerce.number({
        required_error: "Price is required",
    }),
});

export async function uploadProduct(prevState: any, formData: FormData) {
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
