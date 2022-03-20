import  { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../contact/counterSlice";
import { fetchFilters, fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const { productsLoaded, status, filtersLoaded } = useAppSelector(state => state.catalog);

    useEffect(() => {
        if(!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]); 
        //Se nao usar a dependencia, esse método irá executar toda a vez que o componente renderizar
    //[] -  significa que será chamado apenas quando o componente montar (mount)

    useEffect(() => {
        if(!filtersLoaded) dispatch(fetchFilters());
    }, [filtersLoaded]); //segundo useEffect pois a caso as flags mudassem, iria potencialmente fazer uma requisição desnecessaria


    if (status.includes('pending')) return <LoadingComponent></LoadingComponent>;

    return (
        <>
            <ProductList products={products}></ProductList>
        </>
    );
}
