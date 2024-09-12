import * as uuid from 'uuid';

export interface Image {
    id: string;
    value: string;
}

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    productType?: string;
    tags?: string[];
    media: Image[];
}

const timeout = 1000;

const keyStore = 'cache-app';

class Api {
    private products: Array<Product> = [];

    constructor() {
        this.products = JSON.parse(localStorage.getItem(keyStore) ?? '[]');
    }

    public getListProducts(params: { tags?: string[] }): Promise<Product[]> {
        return new Promise(resolve => {
            setTimeout(() => {
                if (params?.tags && params.tags.length) {
                    const result = [];
                    for (let i = 0; i < this.products.length; i++) {
                        let flag = false;
                        for (let j = 0; j < params.tags.length; j++) {
                            if (this.products[i].tags?.includes(params.tags[j])) {
                                flag = true;
                                break;
                            }
                        }

                        if (flag) {
                            result.push(this.products[i]);
                        }
                    }

                    resolve(result);
                }
                resolve(this.products);
            }, timeout);
        });
    }

    public getProductById(id: string): Promise<Product | undefined> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const result = this.products.find(it => it.id === id);
                if (!result) {
                    reject(new Error('Product item not found'));
                }
                resolve(result);
            }, timeout);
        });
    }

    public createProduct(product: Omit<Product, 'id'>): Promise<Product> {
        return new Promise(resolve => {
            setTimeout(() => {
                this.products = [
                    ...this.products,
                    {
                        ...product,
                        id: uuid.v4(),
                    },
                ];
                this.cache();
                resolve(this.products[this.products.length - 1]);
            }, timeout);
        });
    }

    public updateProduct(product: Product): Promise<Product> {
        return new Promise(resolve => {
            setTimeout(() => {
                const index = this.products.findIndex(it => it.id === product.id);
                this.products = [
                    ...this.products.slice(0, index),
                    product,
                    ...this.products.slice(index + 1),
                ];
                this.cache();
                resolve(this.products[index]);
            }, timeout);
        });
    }

    public deleteProduct(productId: string): Promise<boolean> {
        return new Promise(resolve => {
            setTimeout(() => {
                this.products = this.products.filter(it => it.id !== productId);
                this.cache();
                resolve(true);
            });
        });
    }

    public bulkDeleteProduct(productIds: string[]): Promise<boolean> {
        return new Promise(resolve => {
            setTimeout(() => {
                this.products = this.products.filter(it => productIds.indexOf(it.id) === -1);
                this.cache();
                resolve(true);
            }, timeout);
        });
    }

    private cache() {
        localStorage.setItem(keyStore, JSON.stringify(this.products));
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
