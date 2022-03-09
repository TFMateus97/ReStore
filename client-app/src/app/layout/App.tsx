import {
    Container,
    createTheme,
    CssBaseline,
    ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";
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
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
    const { setBasket } = useStoreContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const buyerId = getCookie("buyerId");
        if (buyerId) {
            agent.Basket.getBasket()
                .then((basket) => setBasket(basket))
                .catch((error) => console.log(error));
        }
        setLoading(false);
    }, [setBasket]); //o terminal pode dizer qual dependencia está faltando

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
                    <Route component={NotFound} />
                </Switch>
            </Container>
        </ThemeProvider>
    );
}

export default App;
