import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CustomerRequestType, CustomerStateType } from "../../types/customerType";
import { axiosErrorHandler } from "../../utils/errors";
import CustomerService from "../../services/customerService";

export const getAllCustomer = createAsyncThunk("customer/getAllCustomer", async (_, { rejectWithValue }) => {
    try {
            const response = await CustomerService.getAllCustomer();
            return response.data;
        } catch (err) {
            const error = axiosErrorHandler(err);
            return rejectWithValue(error);
        }
    }
);

export const createCustomer = createAsyncThunk("customer/createCustomer", async (payload: CustomerRequestType, { rejectWithValue }) => {
    try {
        const response = await CustomerService.createCustomer(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const updateCustomer = createAsyncThunk("customer/updateCustomer", async (payload: CustomerRequestType, { rejectWithValue }) => {
    try {
        const response = await CustomerService.updateCustomer(payload);
        return response.data;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

export const deleteCustomer = createAsyncThunk("customer/deleteCustomer", async (id: string, { rejectWithValue }) => {
    try {
        const response = await CustomerService.deleteCustomer(id);
        return response;
    } catch (err) {
        const error = axiosErrorHandler(err)
        return rejectWithValue(error);
    }
});

const initialState: CustomerStateType = {
    customers: null,
    errors: null,
    isLoading: false,
};

export const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCustomer.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllCustomer.fulfilled, (state, action) => {
            state.customers = action.payload;
            state.errors = null;
        });
        builder.addCase(getAllCustomer.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(createCustomer.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createCustomer.fulfilled, (state, action) => {
            state.customers = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(createCustomer.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(updateCustomer.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateCustomer.fulfilled, (state, action) => {
            state.customers = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(updateCustomer.rejected, (state, action) => {
            state.errors = action.payload;
        });
        builder.addCase(deleteCustomer.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteCustomer.fulfilled, (state) => {
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(deleteCustomer.rejected, (state, action) => {
            state.errors = action.payload;
        });

    },
});

export default customerSlice.reducer;
