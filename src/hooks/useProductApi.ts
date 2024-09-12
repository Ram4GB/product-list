import {
    deleteProductAsyncThunk,
    getProductListAsyncThunk,
    actions as productActions,
} from '@/store/product';
import { RootState, useAppDispatch } from '@/store/store';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

const useProductApi = () => {
    const dispatch = useAppDispatch();
    const products = useSelector((state: RootState) => state.ProductSlice.list);
    const isLoading = useSelector((state: RootState) => state.ProductSlice.isLoading);
    const itemError = useSelector((state: RootState) => state.ProductSlice.itemError);
    const listError = useSelector((state: RootState) => state.ProductSlice.listError);
    const tags = useSelector((state: RootState) => state.ProductSlice.filters.tags);

    const fetchProducts = useCallback(
        (params: Parameters<typeof getProductListAsyncThunk>[0]) => {
            dispatch(getProductListAsyncThunk(params));
        },
        [dispatch],
    );

    const filterTags = (tags: string[]) => {
        dispatch(productActions.setTags(tags));
    };

    const clearTags = () => {
        dispatch(productActions.setTags([]));
    };

    const deleteProduct = (productId: string) => {
        dispatch(deleteProductAsyncThunk(productId));
    };

    return {
        tags,
        products,
        isLoading,
        itemError,
        listError,
        clearTags,
        filterTags,
        fetchProducts,
        deleteProduct,
    };
};

export default useProductApi;
