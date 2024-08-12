import type { ProductRepository } from "@fnshop/application";
import type { Product } from "@fnshop/domain";

const createRestApiProductRepository = async (context: {
	api_base_url: string;
}): Promise<ProductRepository> => {
	const { api_base_url } = context;
	const repository: ProductRepository = {
		getProductById: async (productId: number): Promise<Product | null> => {
			const response = await fetch(`${api_base_url}/products/${productId}`);
			const product = await response.json();
			return product;
		},
		createProduct: async (product: Product): Promise<void> => {
			const response = await fetch(`${api_base_url}/products`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(product),
			});

			if (!response.ok) {
				throw new Error(`Failed to create product: ${response.statusText}`);
			}
		},
		updateProduct: async (product: Product): Promise<void> => {
			const response = await fetch(
				`${api_base_url}/products/${product.productId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(product),
				},
			);

			if (!response.ok) {
				throw new Error(`Failed to update product: ${response.statusText}`);
			}
		},
		deleteProduct: async (productId: number): Promise<Product> => {
			const response = await fetch(`${api_base_url}/products/${productId}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error(`Failed to delete product: ${response.statusText}`);
			}
			const product = await response.json();
			return product;
		},
		getProductsByCategory: async (category: number): Promise<Product[]> => {
			const response = await fetch(
				`${api_base_url}/products?category=${category}`,
			);
			if (!response.ok) {
				throw new Error(`Failed to get products: ${response.statusText}`);
			}
			const products = await response.json();
			return products;
		},
		listProducts: async (
			page?: number,
			pageSize?: number,
		): Promise<Product[]> => {
			const response = await fetch(
				`${api_base_url}/products?page=${page}&pageSize=${pageSize}`,
			);
			if (!response.ok) {
				throw new Error(`Failed to get products: ${response.statusText}`);
			}
			const products = await response.json();
			return products;
		},
	};

	return repository;
};
