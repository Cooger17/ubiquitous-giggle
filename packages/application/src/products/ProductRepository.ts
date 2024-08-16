import type { Product } from "@fnshop/domain";

export type ProductRepository = {
	getProductById(productId: number): Promise<Product | null>;
	createProduct(product: Product): Promise<void>;
	updateProduct(product: Product): Promise<void>;
	deleteProduct(productId: number): Promise<Product>;
	getProductsByCategory(category: number): Promise<Product[]>;
	listProducts(page?: number, pageSize?: number): Promise<Product[]>;
};
