import mockApi, { Product } from '@/mockApi/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface InitialState {
    list: Product[];
    isLoading: boolean;
    listError?: { message: string | undefined; at: Date };
    itemError?: { message: string | undefined; at: Date };
}

const initialState: InitialState = {
    list: [],
    isLoading: false,
};

const productSlice = createSlice({
    name: 'ProductSlice',
    initialState,
    reducers: {},
    extraReducers: builders =>
        builders
            .addCase(createProductAsyncThunk.pending, state => {
                state.isLoading = true;
            })
            .addCase(createProductAsyncThunk.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(createProductAsyncThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.itemError = {
                    message: action.error.message,
                    at: new Date(),
                };
            })
            .addCase(getProductListAsyncThunk.pending, state => {
                state.isLoading = true;
            })
            .addCase(getProductListAsyncThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(getProductListAsyncThunk.rejected, (state, error) => {
                state.isLoading = false;
                state.listError = {
                    message: `${error.error.message} ${error.payload}`,
                    at: new Date(),
                };
            }),
});

export const { actions, reducer, name } = productSlice;

export const createProductAsyncThunk = createAsyncThunk(
    `${name}/createProduct`,
    async (product: Omit<Product, 'id'>) => {
        const result = await mockApi.createProduct(product);
        return result;
    },
);

export const getProductListAsyncThunk = createAsyncThunk(
    `${name}/getProductList`,
    async (_params: void, thunkApi) => {
        try {
            const result = await mockApi.getListProducts();
            return result;
        } catch (error) {
            if (error instanceof Error) {
                // If server responses the error
                // Ex: Error('Failed to load list')
                return thunkApi.rejectWithValue(error.message);
            }

            return thunkApi.rejectWithValue(new Error('Unhandle error'));
        }
    },
);

export default productSlice;
