import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ThemeStateType } from "../../types/themeType";

export const editCustomer = createAsyncThunk("customer/editCustomer", async (payload: any) => {
    return payload;
});

export const addCustomer = createAsyncThunk("customer/addCustomer", async () => {
    return true;
});

export const editProduct = createAsyncThunk("product/editProduct", async (payload: any) => {
    return payload;
});

export const addProduct = createAsyncThunk("product/addProduct", async () => {
    return true;
});

export const showOrder = createAsyncThunk("order/showOrder", async (payload: any) => {
    return payload;
});

const initialState: ThemeStateType = {
    data: null,
    isEdit: false
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(editCustomer.pending, (state) => {
            state.isEdit = false;
        });
        builder.addCase(editCustomer.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isEdit = true;
        });
        builder.addCase(addCustomer.pending, (state) => {
            state.isEdit = false;
        });
        builder.addCase(addCustomer.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isEdit = false;
        });
        builder.addCase(editProduct.pending, (state) => {
            state.isEdit = false;
        });
        builder.addCase(editProduct.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isEdit = true;
        });
        builder.addCase(addProduct.pending, (state) => {
            state.isEdit = false;
        });
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isEdit = false;
        });
        builder.addCase(showOrder.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

export default themeSlice.reducer;
