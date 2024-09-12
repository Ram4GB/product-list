import useProductApi from '@/hooks/useProductApi';
import { useEffect, useMemo } from 'react';

const useProducts = () => {
    const { products, tags, fetchProducts, filterTags, clearTags } = useProductApi();

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
    };
};

export default useProducts;
