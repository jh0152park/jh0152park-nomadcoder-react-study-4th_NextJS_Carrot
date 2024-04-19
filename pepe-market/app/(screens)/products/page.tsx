async function getProducts() {
    await new Promise((resolver) => setTimeout(resolver, 10000));
}

export default async function Products() {
    const products = await getProducts();

    return (
        <div>
            <h1 className="text-4xl ">Product!</h1>
        </div>
    );
}
