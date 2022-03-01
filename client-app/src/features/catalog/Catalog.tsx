import React from "react";
import { Product } from "../../app/models/product";

interface Props {
    products: Product[];
    addProduct: () => void;
}

//export default function Catalog(props: Props) {

//dessa forma, nao precisa chamar props.propriedade, mas tem que especificar o parametro
export default function Catalog({ products, addProduct }: Props) {
    return (
        <>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} + {product.price}
                    </li>
                ))}
            </ul>
            <button onClick={addProduct}> Add product</button>
        </>
    );
}
