import type { Product } from "@fnshop/domain";
import { createRestApiProductRepository } from "../src/rest-api-product-repository"; // Remplacez par le chemin réel

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("ProductRepository", () => {
	const api_base_url = "http://api.example.com";
	let repository: ReturnType<typeof createRestApiProductRepository>;

	beforeEach(async () => {
		repository = await createRestApiProductRepository({ api_base_url });
	});

	test("getProductById - success", async () => {
		const mockProduct: Product = {
			productId: 1,
			name: "Test Product",
			description: "This is a test product",
			price: 9.99,
			image: "https://example.com/test-product.jpg",
			category: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => mockProduct,
		} as Response);

		const product = await (await repository).getProductById(1);
		expect(product).toEqual(mockProduct);
	});

	test("getProductById - failure", async () => {
		mockFetch.mockResolvedValueOnce({
			ok: false,
			statusText: "Not Found",
			json: jest.fn().mockRejectedValue("Failed to get product: Not Found"),
		} as Response);

		await expect((await repository).getProductById(1)).rejects.toThrow(
			"Failed to get product: Not Found",
		);
	});

	test("createProduct - success", async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
		} as Response);

		await expect(
			(await repository).createProduct({
				productId: 1,
				name: "New Product",
				price: 10.0,
				image: "https://example.com/new-product.jpg",
				category: 1,
				description: "This is a new product",
				createdAt: new Date(),
				updatedAt: new Date(),
			} as Product),
		).resolves.toBeUndefined();
	});

	test("createProduct - failure", async () => {
		mockFetch.mockResolvedValueOnce({
			ok: false,
			statusText: "Bad Request",
		} as Response);

		await expect(
			(await repository).createProduct({
				productId: 1,
				name: "New Product",
				price: 10.0,
				image: "https://example.com/new-product.jpg",
				category: 1,
				description: "This is a new product",
				createdAt: new Date(),
				updatedAt: new Date(),
			} as Product),
		).rejects.toThrow("Failed to create product: Bad Request");
	});

	test("updateProduct - success", async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
		} as Response);

		await expect(
			(await repository).updateProduct({
				productId: 1,
				name: "Updated Product",
				price: 10.0,
				image: "https://example.com/updated-product.jpg",
				category: 1,
				description: "This is an updated product",
				createdAt: new Date(),
				updatedAt: new Date(),
			} as Product),
		).resolves.toBeUndefined();
	});

	test("updateProduct - failure", async () => {
		mockFetch.mockResolvedValueOnce({
			ok: false,
			statusText: "Bad Request",
		} as Response);

		await expect(
			(await repository).updateProduct({
				productId: 1,
				name: "Updated Product",
				price: 10.0,
				image: "https://example.com/updated-product.jpg",
				category: 1,
				description: "This is an updated product",
				createdAt: new Date(),
				updatedAt: new Date(),
			} as Product),
		).rejects.toThrow("Failed to update product: Bad Request");
	});

	test("deleteProduct - success", async () => {
		const mockProduct: Product = {
			productId: 1,
			name: "Deleted Product",
			description: "This is a deleted product",
			price: 9.99,
			image: "https://example.com/deleted-product.jpg",
			category: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => mockProduct,
		} as Response);

		const product = await (await repository).deleteProduct(1);
		expect(product).toEqual(mockProduct);
	});

	test("deleteProduct - failure", async () => {
		mockFetch.mockResolvedValueOnce({
			ok: false,
			statusText: "Not Found",
		} as Response);

		await expect((await repository).deleteProduct(1)).rejects.toThrow(
			"Failed to delete product: Not Found",
		);
	});

	test("getProductsByCategory - success", async () => {
		const mockProducts: Product[] = [
			{
				productId: 1,
				name: "Product A",
				description: "",
				price: 0,
				image: "",
				category: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				productId: 2,
				name: "Product B",
				description: "",
				price: 0,
				image: "",
				category: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => mockProducts,
		} as Response);

		const products = await (await repository).getProductsByCategory(1);
		expect(products).toEqual(mockProducts);
	});

	test("getProductsByCategory - failure", async () => {
		mockFetch.mockResolvedValueOnce({
			ok: false,
			statusText: "Internal Server Error",
		} as Response);

		await expect((await repository).getProductsByCategory(1)).rejects.toThrow(
			"Failed to get products: Internal Server Error",
		);
	});

	test("listProducts - success", async () => {
		const mockProducts: Product[] = [
			{
				productId: 1,
				name: "Product A",
				description: "",
				price: 0,
				image: "",
				category: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				productId: 2,
				name: "Product B",
				description: "",
				price: 0,
				image: "",
				category: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => mockProducts,
		} as Response);

		const products = await (await repository).listProducts(1, 10);
		expect(products).toEqual(mockProducts);
	});

	test("listProducts - failure", async () => {
		mockFetch.mockResolvedValueOnce({
			ok: false,
			statusText: "Internal Server Error",
		} as Response);

		await expect((await repository).listProducts(1, 10)).rejects.toThrow(
			"Failed to get products: Internal Server Error",
		);
	});
});
