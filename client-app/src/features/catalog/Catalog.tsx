import {
    Avatar,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
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
            <List>
                {products.map((product) => (
                    <ListItem key={product.id}>
                        <ListItemAvatar>
                            <Avatar src={product.pictureUrl}></Avatar>
                        </ListItemAvatar>
                        <ListItemText>
                            {product.name} - {product.price}
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" onClick={addProduct}>
                {" "}
                Add product
            </Button>
        </>
    );
}
