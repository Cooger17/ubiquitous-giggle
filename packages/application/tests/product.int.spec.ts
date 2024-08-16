import { createInMemoryProductRepository } from "../../infra/src/in-memory-product-repository";
import { createDeleteProductCommandHandler } from "../dist";
import { createCreateProductCommandHandler } from "../src/products/commandHandlers/createCreateProductCommandHandler";
import { createListProductQueryHandler } from "../src/products/queryHandlers/createListProductQueryHandler";
import { CreateProductCommand } from "./../../domain/src/models/products/Product";
import { createUpdateProductCommandHandler } from "./../src/products/commandHandlers/createUpdateProductCommandHandler";

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("Product", () => {
	test("createProduct", async () => {
		const product_repository = createInMemoryProductRepository();
		const createProductCommandHandler = createCreateProductCommandHandler({
			product_repository,
		});

		const command = {
			productId: 1,
			name: "Test Product",
			description: "This is a test product",
			price: 9.99,
			image: "https://example.com/test-product.jpg",
			category: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const result = await createProductCommandHandler.execute(command);
		console.log(result);
		expect(result).toEqual(command);
	});

	test("updateProduct", async () => {
		const product_repository = createInMemoryProductRepository();
		const updateProductCommandHandler = createUpdateProductCommandHandler({
			product_repository,
		});
		//Create a product to update
		const createProductCommandHandler = createCreateProductCommandHandler({
			product_repository,
		});
		const createCommand = {
			productId: 1,
			name: "Test Product",
			description: "This is a test product",
			price: 9.99,
			image: "https://example.com/test-product.jpg",
			category: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		await createProductCommandHandler.execute(createCommand);
		//Update created product
		const command = {
			productId: 1,
			name: "Test Product",
			description: "This is a test product",
			price: 29.99,
			image: "https://example.com/test-product.jpg",
			category: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		await updateProductCommandHandler.execute(command);
		const result = await product_repository.getProductById(1);
		expect(result).toEqual(command);
	});

	test("delete product", async () => {
		const product_repository = createInMemoryProductRepository();
		const createProductHandler = createCreateProductCommandHandler({
			product_repository,
		});
		const deleteProductHandler = createDeleteProductCommandHandler({
			product_repository,
		});

		const createCommand = {
			productId: 1,
			name: "Test Product",
			description: "This is a test product",
			price: 9.99,
			image: "https://example.com/test-product.jpg",
			category: 1,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		await createProductHandler.execute(createCommand);

		const deleteCommand = {
			productId: 1,
		};

		await deleteProductHandler.execute(deleteCommand);
		const result = await product_repository.getProductById(1);
		expect(result).toEqual(null);
	});

	test("list product", async () => {
		const product_repository = createInMemoryProductRepository();
		const createProductCommand = createCreateProductCommandHandler({
			product_repository,
		});
		let i = 1;

		while (i <= 20) {
			const command = {
				productId: i,
				name: `Test product ${i}`,
				description: `This is a test product ${i}`,
				price: Number.parseInt((Math.random() * 100).toFixed(2)),
				image: "https://example.com/test-product.jpg",
				category: Math.floor(Math.random() * 10 + 1),
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			await createProductCommand.execute(command);
			i++;
		}
		const result = await product_repository.listProducts();
		console.log(result);
		expect(result.length).toBeGreaterThan(0);
	});

	test("list product by category", async () => {
		const product_repository = createInMemoryProductRepository();
		const createProductCommand = createCreateProductCommandHandler({
			product_repository,
		});
		let i = 1;
		while (i <= 20) {
			const command = {
				productId: i,
				name: `Test product ${i}`,
				description: `This is a test product ${i}`,
				price: Number.parseInt((Math.random() * 100).toFixed(2)),
				image: "https://example.com/test-product.jpg",
				category: Math.floor(Math.random() * 10 + 1),
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			await createProductCommand.execute(command);
			i++;
		}
		const result = await product_repository.getProductsByCategory(1);
		console.log(result);
		expect(result.length).toBeGreaterThan(0);
	});

	test("getProductById", async () => {
		const product_repository = createInMemoryProductRepository();
		const createProductCommand = createCreateProductCommandHandler({
			product_repository,
		});
		let i = 1;
		while (i <= 20) {
			const command = {
				productId: i,
				name: `Test product ${i}`,
				description: `This is a test product ${i}`,
				price: Number.parseInt((Math.random() * 100).toFixed(2)),
				image: "https://example.com/test-product.jpg",
				category: Math.floor(Math.random() * 10 + 1),
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			await createProductCommand.execute(command);
			i++;
		}
		const result = await product_repository.getProductById(6);
		console.log(result);
		expect(result).not.toBeNull();
	});
});
