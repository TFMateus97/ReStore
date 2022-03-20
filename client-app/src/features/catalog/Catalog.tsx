import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import  { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../contact/counterSlice";
import { fetchFilters, fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";

const sortOptions = [
    {value: 'name', label: 'Alphabetical'},
    {value: 'priceDesc', label: 'Price - High to low'},
    {value: 'price', label: 'Price - Low to high'},
]

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const { productsLoaded, status, filtersLoaded, brands, types } = useAppSelector(state => state.catalog);

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
            <Grid container spacing={4}>
                <Grid item xs={3}>
                    <Paper sx={{mb: 2}}>
                        <TextField
                            label='Search products'
                            variant='outlined'
                            fullWidth
                        ></TextField>
                        <Paper sx={{mb: 2, p: 2}}>
                            <FormControl component='fieldset'>
                                <RadioGroup>
                                    {sortOptions.map(({value, label}) => (
                                        <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Paper>
                    </Paper>
                    <Paper sx={{mb: 2, p: 2}}>
                        <FormGroup>
                            {brands.map((brand) => (
                                <FormControlLabel control={<Checkbox />} label={brand} key={brand} />
                            ))}
                        </FormGroup>
                    </Paper>
                    <Paper sx={{mb: 2, p: 2}}>
                        <FormGroup>
                            {types.map((type) => (
                                <FormControlLabel control={<Checkbox />} label={type} key={type} />
                            ))}
                        </FormGroup>
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <ProductList products={products}></ProductList>
                </Grid>
                <Grid item xs={3}></Grid>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography>
                        Displaying 1-6 out of 20 items
                    </Typography>
                    <Pagination color='secondary' size='large' count={2} page={1}></Pagination>
                </Box>
                <Grid item xs={9}></Grid>
            </Grid>
    );
}
