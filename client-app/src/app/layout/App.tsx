import {
    Container,
    createTheme,
    CssBaseline,
    ThemeProvider,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import { useAppDispatch } from "../../features/contact/counterSlice";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import Register from "../../features/account/Register";
import  Login  from "../../features/account/Login";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import PrivateRoute from "./PrivateRoute";

function App() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    const initApp = useCallback(async () => {
        try {
            await dispatch(fetchCurrentUser());
            await dispatch(fetchBasketAsync());
        } catch (error) {
            console.log(error)
        }
    }, [dispatch]);

    useEffect(() => {
        initApp().then(() => setLoading(false))
    }, [initApp]); //o terminal pode dizer qual dependencia está faltando

    const [darkMode, setDarkMode] = useState(false);
    const palleteType = darkMode ? "dark" : "light";

    const theme = createTheme({
        palette: {
            mode: palleteType,
            background: {
                default: palleteType === "light" ? "#eaeaea" : "#121212",
            },
        },
    });

    function handleThemeChange() {
        setDarkMode(!darkMode);
    }

    if (loading) return <LoadingComponent></LoadingComponent>;

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer
                position="bottom-right"
                hideProgressBar
                theme="colored"
            ></ToastContainer>
            <CssBaseline></CssBaseline>
            <Header
                darkMode={darkMode}
                handleThemeChange={handleThemeChange}
            ></Header>
            <Container>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/catalog" component={Catalog} />
                    <Route path="/catalog/:id" component={ProductDetails} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/contact" component={ContactPage} />
                    <Route path="/server-error" component={ServerError} />
                    <Route path="/basket" component={BasketPage} />
                    <PrivateRoute path="/checkout" component={CheckoutPage} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route component={NotFound} />
                </Switch>
            </Container>
        </ThemeProvider>
    );
}

export default App;
