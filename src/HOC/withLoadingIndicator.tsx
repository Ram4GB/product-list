import FullPageLoading from '@/components/FullPageLoading';
import { RootState } from '@/store/store';
import React, { ComponentProps, FC } from 'react';
import { useSelector } from 'react-redux';

function withLoadingIndicator(Component: FC) {
    return (props: ComponentProps<typeof Component>) => {
        const loading = useSelector((state: RootState) => state.ProductSlice.isLoading);
        return React.cloneElement(
            <>
                <Component {...props} />
                {loading && <FullPageLoading />}
            </>,
        );
    };
}

export default withLoadingIndicator;
