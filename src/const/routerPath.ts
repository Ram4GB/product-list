export enum RouterPath {
    Root = '/',
    Products = '/products',
    CreateProduct = '/create-product',
    EditProduct = '/product/:id',
}

export const buildEditProductLink = (id: string) => RouterPath.EditProduct.replace(':id', id);

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
