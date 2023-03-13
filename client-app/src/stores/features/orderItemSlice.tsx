import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderItemsStateType } from "../../types/orderItemsType";

export const addOrderItem = createAsyncThunk("order/addOrderItem", (product: any) => product);

export const removeOrderItem = createAsyncThunk("order/removeOrderItem", (id: number) => id);

export const removeAllOrderItems = createAsyncThunk("order/removeAllOrderItems", () => []);

export const updateQuantity = createAsyncThunk("order/updateQuantity", (product: any) => product);

const initialState: OrderItemsStateType = {
    customer_id: 0,
    products: [],
    discount: 0
};

export const orderSlice = createSlice({
    name: "orderItem",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addOrderItem.fulfilled, (state, action) => {
            state.products = [...state.products, action.payload];
        });
        builder.addCase(removeOrderItem.fulfilled, (state, action) => {
            state.products = state.products.filter((product: any) => product.id !== action.payload);
        });
        builder.addCase(removeAllOrderItems.fulfilled, (state, action) => {
            state.products = action.payload;
        });
        builder.addCase(updateQuantity.fulfilled, (state, action) => {
            state.products = state.products.map((product: any) =>
                product.id === action.payload.id ? action.payload : product
            );
        });
    },
});

export default orderSlice.reducer;
