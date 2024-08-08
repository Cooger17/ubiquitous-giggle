import type { Product } from "../../models/products/Product";

export interface ProductRepository {
	getProducts(): Promise<Product[]>;
	getProductById(id: number): Promise<Product>;
	createProduct(product: Product): Promise<Product>;
	updateProduct(product: Product): Promise<Product>;
	deleteProduct(id: number): Promise<void>;
	getProductsByCategory(category: string): Promise<Product[]>;
}
