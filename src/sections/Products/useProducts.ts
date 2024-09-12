import useProductApi from '@/hooks/useProductApi';
import { useEffect, useMemo } from 'react';

const useProducts = () => {
    const {
        products,
        tags,
        fetchProducts,
        filterTags,
        clearTags,
        deleteProduct,
        navigateProductDetail,
    } = useProductApi();

    useEffect(() => {
        fetchProducts({
            tags,
        });
    }, [fetchProducts, tags]);

    const memoProducts = useMemo(
        () =>
            products.map(it => ({
                ...it,
                title: it.title.slice(0, 50),
            })),
        [products],
    );

    return {
        tags,
        memoProducts,
        handleFilter: filterTags,
        clearTags,
        deleteProduct,
        navigateProductDetail,
    };
};

export default useProducts;
