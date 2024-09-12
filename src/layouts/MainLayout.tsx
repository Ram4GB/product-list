import Header from '@/components/Header';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <React.Fragment>
            <Header />
            <Suspense fallback={null}>
                <Outlet />
            </Suspense>
        </React.Fragment>
    );
};

export default MainLayout;
