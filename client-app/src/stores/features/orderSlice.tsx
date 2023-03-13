import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderRequestType, OrderStateType } from "../../types/orderType";
import { axiosErrorHandler } from "../../utils/errors";
import OrderService from "../../services/orderService";

export const createOrder = createAsyncThunk("order/createOrder", async (payload: OrderRequestType, { rejectWithValue }) => {
    try {
        const response = await OrderService.createOrder(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

const initialState: OrderStateType = {
    orders: null,
    errors: null,
    isLoading: false,
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.errors = action.payload;
        });
    },
});

export default orderSlice.reducer;
