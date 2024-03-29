import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "../account/accountSlice";
import { basketSlice } from "../basket/basketSlice";
import { catalogSlice } from "../catalog/catalogSlice";
import { counterSlice } from "../contact/counterSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        basket: basketSlice.reducer,
        catalog: catalogSlice.reducer,
        account: accountSlice.reducer
    }
})  