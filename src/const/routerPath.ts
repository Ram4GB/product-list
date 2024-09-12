export enum RouterPath {
    Root = '/',
    Products = '/products',
    CreateProduct = '/create-product',
}

export const headerMenus = [
    {
        name: 'Homepage',
        path: RouterPath.Root,
    },
    {
        name: 'Products',
        path: RouterPath.Products,
    },
    {
        name: 'Create Product',
        path: RouterPath.CreateProduct,
    },
];
