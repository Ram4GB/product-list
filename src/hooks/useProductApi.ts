import { getProductListAsyncThunk } from '@/store/product';
import { RootState, useAppDispatch } from '@/store/store';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

const useProductApi = () => {
    const dispatch = useAppDispatch();
    const products = useSelector((state: RootState) => state.ProductSlice.list);
    const isLoading = useSelector((state: RootState) => state.ProductSlice.isLoading);
    const itemError = useSelector((state: RootState) => state.ProductSlice.itemError);
    const listError = useSelector((state: RootState) => state.ProductSlice.listError);

    const fetchProducts = useCallback(() => {
        dispatch(getProductListAsyncThunk());
    }, [dispatch]);

    return {
        products,
        isLoading,
        itemError,
        listError,
        fetchProducts,
    };
};

export default useProductApi;
