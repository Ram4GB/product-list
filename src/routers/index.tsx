import MainLayout from '@/layouts/MainLayout';
import Homepage from '@/sections/Homepage/';
import ProductForm from '@/sections/ProductForm/withLoading';
import Products from '@/sections/Products/withLoading';
import { RouterProvider, createBrowserRouter, useRouteError } from 'react-router-dom';

import { RouterPath } from '../const/routerPath';

const AppRouter = () => {
    const router = createBrowserRouter([
        {
            children: [
                {
                    element: <MainLayout />,
                    children: [
                        {
                            path: RouterPath.Root,
                            element: <Homepage />,
                        },
                        {
                            path: RouterPath.Products,
                            element: <Products />,
                        },
                        {
                            path: RouterPath.CreateProduct,
                            element: <ProductForm />,
                        },
                        {
                            path: RouterPath.EditProduct,
                            element: <ProductForm />,
                        },
                    ],
                },
            ],
            ErrorBoundary: () => {
                throw useRouteError();
            },
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AppRouter;
