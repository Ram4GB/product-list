import mockApi, { Product } from '@/mockApi/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface InitialState {
    list: Product[];
    isLoading: boolean;
    listError: string | undefined;
    itemError: string | undefined;
}

const initialState: InitialState = {
    list: [],
    isLoading: false,
    listError: '',
    itemError: '',
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
                state.itemError = action.error.message;
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
                state.listError = error.error.message;
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
            return thunkApi.rejectWithValue(error);
        }
    },
);

export default productSlice;
