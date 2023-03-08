import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./features/customerSlice";
import productReducer from "./features/productSlice";
import themeReducer from "./features/themeSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

const store = configureStore({
    reducer: {
        customer: customerReducer,
        product: productReducer,
        theme: themeReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
