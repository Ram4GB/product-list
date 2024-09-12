import { RootState } from '@/store/store';
import { enqueueSnackbar } from 'notistack';
import React, { PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';

function withError(Component: any) {
    return (props: PropsWithChildren) => {
        const listError = useSelector((state: RootState) => state.ProductSlice.listError);
        const itemError = useSelector((state: RootState) => state.ProductSlice.itemError);

        useEffect(() => {
            if (!listError) return;
            enqueueSnackbar(listError.message, { variant: 'error' });
        }, [listError]);

        useEffect(() => {
            if (!itemError) return;
            enqueueSnackbar(itemError.message, { variant: 'error' });
        }, [itemError]);

        return React.cloneElement(<Component {...props} />);
    };
}

export default withError;
