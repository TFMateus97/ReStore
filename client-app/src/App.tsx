import { useEffect, useState } from "react";

function App() {
    const [products, setProducts] = useState([{ id: "", name: "", price: "" }]);

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []); //Se nao usar a dependencia, esse método irá executar toda a vez que o componente renderizar
    //[] -  significa que será chamado apenas quando o componente montar (mount)
    return (
        <div>
            <h1>Re-Store</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} + {product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
