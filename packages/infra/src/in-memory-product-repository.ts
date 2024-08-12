import type { ProductRepository } from "@fnshop/application";
import type { Product } from "@fnshop/domain";

const createInMemoryProductRepository = (): ProductRepository => {
	const products: Map<number, Product> = new Map();
	const repository: ProductRepository = {
		createProduct: async (product: Product): Promise<void> => {
			if (products.has(product.productId)) {
				throw new Error(`Product with id ${product.productId} already exists`);
			}

			products.set(product.productId, product);
			console.log(`Product with id ${product.productId} created`);
		},
		getProductById: async (productId: number): Promise<Product | null> => {
			if (!products.has(productId)) {
				throw new Error(`Product with id ${productId} not found`);
			}
			return products.get(productId) || null;
		},
		updateProduct: async (product: Product): Promise<void> => {
			if (!products.has(product.productId)) {
				throw new Error(`Product with id ${product.productId} not found`);
			}
			products.set(product.productId, product);
			console.log(products);
		},
		deleteProduct: async (productId: number): Promise<Product> => {
			const product = products.get(productId);
			if (!product) {
				throw new Error(`Product with id ${productId} not found`);
			}
			products.delete(productId);
			return product;
		},

		getProductsByCategory: async (category: number): Promise<Product[]> => {
			if (!products.has(category)) {
				throw new Error(`Product with id ${category} not found`);
			}
			const productsArray = Array.from(products.values());
			return productsArray.filter((product) => product.category === category);
		},
		listProducts: async (page = 1, pageSize = 10): Promise<Product[]> => {
			const startIndex = (page - 1) * pageSize;
			const endIndex = startIndex + pageSize;
			const productsArray = Array.from(products.values());
			return productsArray.slice(startIndex, endIndex);
		},
	};

	return repository;
};
