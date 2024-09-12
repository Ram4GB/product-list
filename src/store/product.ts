import mockApi, { Product } from '@/mockApi/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface InitialState {
    list: Product[];
    isLoadingItem: boolean;
    isLoadingList: boolean;
    listError: string | undefined;
    itemError: string | undefined;
}

const initialState: InitialState = {
    list: [],
    isLoadingItem: false,
    isLoadingList: false,
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
                state.isLoadingItem = true;
            })
            .addCase(createProductAsyncThunk.fulfilled, state => {
                state.isLoadingItem = false;
            })
            .addCase(createProductAsyncThunk.rejected, (state, action) => {
                state.isLoadingItem = false;
                state.itemError = action.error.message;
            })
            .addCase(getProductListAsyncThunk.pending, state => {
                state.isLoadingItem = true;
            })
            .addCase(getProductListAsyncThunk.fulfilled, (state, action) => {
                state.isLoadingItem = false;
                state.list = action.payload;
            })
            .addCase(getProductListAsyncThunk.rejected, (state, error) => {
                state.isLoadingItem = false;
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
