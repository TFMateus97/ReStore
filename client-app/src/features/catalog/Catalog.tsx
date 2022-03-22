import { Grid, Paper } from "@mui/material";
import  { useEffect } from "react";
import CheckBoxGroup from "../../app/components/CheckBoxGroup";
import AppPagination from "../../app/components/AppPagination";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../contact/counterSlice";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const sortOptions = [
    {value: 'name', label: 'Alphabetical'},
    {value: 'priceDesc', label: 'Price - High to low'},
    {value: 'price', label: 'Price - Low to high'},
]

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const { productsLoaded, status, filtersLoaded, brands, types, productParams, metaData } = useAppSelector(state => state.catalog);

    useEffect(() => {
        if(!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]); 
        //Se nao usar a dependencia, esse método irá executar toda a vez que o componente renderizar
    //[] -  significa que será chamado apenas quando o componente montar (mount)

    useEffect(() => {
        if(!filtersLoaded) dispatch(fetchFilters());
    }, [filtersLoaded]); //segundo useEffect pois a caso as flags mudassem, iria potencialmente fazer uma requisição desnecessaria


    if (status.includes('pending') || !metaData) return <LoadingComponent></LoadingComponent>;

    return (
            <Grid container columnSpacing={4}>
                <Grid item xs={3}>
                    <Paper sx={{mb: 2}}>
                       <ProductSearch></ProductSearch>
                        <Paper sx={{mb: 2, p: 2}}>
                            <RadioButtonGroup 
                                options={ sortOptions } 
                                selectedValue={ productParams.orderBy }
                                onChange={ (e) => dispatch(setProductParams({orderBy: e.target.value})) } />
                        </Paper>
                    </Paper>
                    <Paper sx={{mb: 2, p: 2}}>
                        <CheckBoxGroup 
                            items={ brands } 
                            onChange={ (items: string[]) => dispatch(setProductParams({brands: items})) } 
                            checkedValues={productParams.brands} 
                        />
                    </Paper>
                    <Paper sx={{mb: 2, p: 2}}>
                        <CheckBoxGroup 
                            items={types} 
                            onChange={ (items: string[]) => dispatch(setProductParams({types: items})) } 
                            checkedValues={ productParams.types } 
                        />
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <ProductList products={products}></ProductList>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={9} sx={{mb: 2}}>
                    <AppPagination metaData={metaData} onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}></AppPagination>
                </Grid>
            </Grid>
        );
}
