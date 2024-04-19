async function getProduct() {
    await new Promise((resolve) => setTimeout(resolve, 100000));
}

export default async function ProductDetail({
    params: { id },
}: {
    params: { id: string };
}) {
    const product = await getProduct();

    return <h1>Product Detail! {id}</h1>;
}
