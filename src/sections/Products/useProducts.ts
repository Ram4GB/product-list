import useProductApi from '@/hooks/useProductApi';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo, useState } from 'react';

const useProducts = () => {
    const {
        products,
        tags,
        fetchProducts,
        filterTags,
        clearTags,
        deleteProduct,
        navigateProductDetail,
        bulkDeleteProduct,
    } = useProductApi();

    const { enqueueSnackbar } = useSnackbar();

    const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});

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

    const handleToggleSelectItem = (id: string) => {
        setSelectedIds({
            ...selectedIds,
            [id]: !selectedIds[id],
        });
    };

    const confirmBulkDelete = () => {
        bulkDeleteProduct(
            Object.entries(selectedIds)
                .filter(([, value]) => {
                    return value;
                })
                .map(([key]) => key),
        )
            .unwrap()
            .then(() => {
                enqueueSnackbar('Delete sucessfully', { variant: 'success' });
                setSelectedIds({});
            });
    };

    return {
        tags,
        selectedIds,
        memoProducts,
        handleFilter: filterTags,
        clearTags,
        deleteProduct,
        navigateProductDetail,
        handleToggleSelectItem,
        confirmBulkDelete,
    };
};

export default useProducts;
