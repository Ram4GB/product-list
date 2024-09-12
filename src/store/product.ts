import mockApi, { Product } from '@/mockApi/api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';

interface InitialState {
    list: Product[];
    item: Product | undefined;
    isLoading: boolean;
    listError?: { message: string | undefined; at: Date };
    itemError?: { message: string | undefined; at: Date };
    filters: {
        tags: string[];
    };
}

const initialState: InitialState = {
    list: [],
    item: undefined,
    isLoading: false,
    filters: {
        tags: [],
    },
};

const productSlice = createSlice({
    name: 'ProductSlice',
    initialState,
    reducers: {
        setTags: (state, action: PayloadAction<string[]>) => {
            state.filters.tags = action.payload;
        },
    },
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
            .addCase(updateProductAsyncThunk.pending, state => {
                state.isLoading = true;
            })
            .addCase(updateProductAsyncThunk.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(updateProductAsyncThunk.rejected, (state, action) => {
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
            })
            .addCase(getProductAsyncThunk.pending, state => {
                state.isLoading = true;
            })
            .addCase(getProductAsyncThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.item = action.payload;
            })
            .addCase(getProductAsyncThunk.rejected, (state, error) => {
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
    async (product: Omit<Product, 'id'>, thunkApi) => {
        try {
            const result = await mockApi.createProduct(product);
            thunkApi.dispatch(getProductListAsyncThunk({}));
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

export const updateProductAsyncThunk = createAsyncThunk(
    `${name}/updateProduct`,
    async (product: Product, thunkApi) => {
        try {
            const result = await mockApi.updateProduct(product);
            thunkApi.dispatch(getProductListAsyncThunk({}));
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

export const getProductListAsyncThunk = createAsyncThunk(
    `${name}/getProductList`,
    async (params: { tags?: string[] }, thunkApi) => {
        try {
            const tags =
                params.tags ??
                (thunkApi.getState() as unknown as RootState).ProductSlice.filters.tags;
            const result = await mockApi.getListProducts({ tags });
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

export const getProductAsyncThunk = createAsyncThunk(
    `${name}/getProduct`,
    async (productId: string, thunkApi) => {
        try {
            const result = await mockApi.getProductById(productId);
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

export const deleteProductAsyncThunk = createAsyncThunk(
    `${name}/deleteProduct`,
    async (productId: string, thunkApi) => {
        try {
            const result = await mockApi.deleteProduct(productId);
            thunkApi.dispatch(getProductListAsyncThunk({}));
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
