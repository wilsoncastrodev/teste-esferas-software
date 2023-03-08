import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductRequestType, ProductStateType } from "../../types/productType";
import { axiosErrorHandler } from "../../utils/errors";
import ProductService from "../../services/productService";

export const getAllProduct = createAsyncThunk("product/getAllProduct", async (_, { rejectWithValue }) => {
    try {
        const response = await ProductService.getAllProduct();
        return response.data;
    } catch (err) {
            const error = axiosErrorHandler(err);
            return rejectWithValue(error);
        }
    }
);

export const createProduct = createAsyncThunk("product/createProduct", async (payload: ProductRequestType, { rejectWithValue }) => {
    try {
        const response = await ProductService.createProduct(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const updateProduct = createAsyncThunk("product/updateProduct", async (payload: ProductRequestType, { rejectWithValue }) => {
    try {
        const response = await ProductService.updateProduct(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id: string, { rejectWithValue }) => {
    try {
        const response = await ProductService.deleteProduct(id);
        return response;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

const initialState: ProductStateType = {
    products: null,
    errors: null,
    isLoading: false,
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllProduct.fulfilled, (state, action) => {
            state.products = action.payload;
            state.errors = null;
        });
        builder.addCase(getAllProduct.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(createProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(updateProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(deleteProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteProduct.fulfilled, (state) => {
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.errors = action.payload;
        });
    },
});

export default productSlice.reducer;
