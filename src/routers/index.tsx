import MainLayout from '@/layouts/MainLayout';
import Homepage from '@/sections/Homepage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

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
                            element: 'Products',
                        },
                        {
                            path: RouterPath.CreateProduct,
                            element: 'Products',
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AppRouter;
