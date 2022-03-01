import { Container, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import { Product } from "../models/product";
import Header from "./Header";

function App() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []); //Se nao usar a dependencia, esse método irá executar toda a vez que o componente renderizar
    //[] -  significa que será chamado apenas quando o componente montar (mount)

    function addProduct() {
        setProducts((prevState) => [
            ...prevState,
            {
                id: prevState.length + 101,
                name: "product" + prevState.length + 1,
                price: prevState.length * 100 + 100,
                brand: "some brand",
                description: "some description",
                pictureUrl: "http://picsum.photos/200",
                quantityInStock: 10,
            },
        ]);
    }

    return (
        <>
            <CssBaseline></CssBaseline>
            <Header></Header>
            <Container>
                <Catalog products={products} addProduct={addProduct}></Catalog>
            </Container>
        </>
    );
}

export default App;
