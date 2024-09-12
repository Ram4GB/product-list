import FullPageLoading from '@/components/FullPageLoading';
import { RootState } from '@/store/store';
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

const withLoadingIndicator = (Component: FunctionComponent) => {
    return () => {
        const loading = useSelector((state: RootState) => state.ProductSlice.isLoading);
        return React.cloneElement(
            <>
                <Component />
                {loading && <FullPageLoading />}
            </>,
        );
    };
};

export default withLoadingIndicator;
