"use server";

export async function onSubmit(prevState: any, formData: FormData) {
    console.log("run login the server");
    return {
        errors: ["wrong password", "please check your password"],
    };
}
