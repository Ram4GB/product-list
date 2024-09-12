export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    productType?: string;
    tags?: string[];
}

const timeout = 2000;

class Api {
    private products: Array<Product> = [];
    constructor() {}

    public getListProducts() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.products);
            }, timeout);
        });
    }

    public getProductById(id: string) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.products.find(it => it.id === id));
            }, timeout);
        });
    }

    public createProduct(product: Omit<Product, 'id'>) {
        return new Promise(resolve => {
            setTimeout(() => {
                this.products.push({
                    ...product,
                    id: this.products.length.toString(),
                });
                resolve(this.products[this.products.length - 1]);
            }, timeout);
        });
    }
}

const mockApi = new Api();

// await mockApi.createProduct({
//     description: 'description',
//     price: 0,
//     title: 'Title',
//     productType: 'product Type',
//     tags: ['tag1'],
// });

// const result = await mockApi.getListProducts();

// console.log('result', result);

export default mockApi;
