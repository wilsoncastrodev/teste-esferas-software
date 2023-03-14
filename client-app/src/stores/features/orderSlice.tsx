import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderRequestType, OrderStateType } from "../../types/orderType";
import { axiosErrorHandler } from "../../utils/errors";
import OrderService from "../../services/orderService";

export const getAllOrder = createAsyncThunk("order/getAllOrder", async (_, { rejectWithValue }) => {
    try {
        const response = await OrderService.getAllOrder();
        return response.data;
    } catch (err) {
            const error = axiosErrorHandler(err);
            return rejectWithValue(error);
        }
    }
);

export const createOrder = createAsyncThunk("order/createOrder", async (payload: OrderRequestType, { rejectWithValue }) => {
    try {
        const response = await OrderService.createOrder(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const deleteOrder = createAsyncThunk("order/deleteOrder", async (id: string, { rejectWithValue }) => {
    try {
        const response = await OrderService.deleteOrder(id);
        return response;
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
        builder.addCase(getAllOrder.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllOrder.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.errors = null;
        });
        builder.addCase(getAllOrder.rejected, (state, action) => {
            state.errors = action.payload;
        });
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
        builder.addCase(deleteOrder.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteOrder.fulfilled, (state) => {
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(deleteOrder.rejected, (state, action) => {
            state.errors = action.payload;
        });
    },
});

export default orderSlice.reducer;
