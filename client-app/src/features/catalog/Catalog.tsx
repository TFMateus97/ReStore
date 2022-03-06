import React, { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Catalog.list()
            .then((products) => setProducts(products))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []); //Se nao usar a dependencia, esse método irá executar toda a vez que o componente renderizar
    //[] -  significa que será chamado apenas quando o componente montar (mount)

    if (loading) return <LoadingComponent></LoadingComponent>;

    return (
        <>
            <ProductList products={products}></ProductList>
        </>
    );
}
