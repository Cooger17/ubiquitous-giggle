import { expect, test } from "bun:test";
import { createRestApiCategoryRepository } from "../src/rest-api-product-repository";

test("createRestApiProductRepository should return a ProductRepository object", async () => {
	const context = {
		api_base_url: "https://fnshop-graphql.fnshop-services.workers.dev/graphql",
	};
	const repository = await createRestApiCategoryRepository(context);
	expect(repository).toBeObject();
	//expect(repository.getProductById).toBeFunction();
	expect(repository.createCategory).toBeFunction();
	expect(repository.update).toBeFunction();
	expect(repository.delete).toBeFunction();
	expect(repository.CategoriesFindById).toBeFunction();
	expect(repository.list).toBeFunction();
});

test("getProductById should return a Product object", async () => {
	const context = {
		api_base_url: "https://fnshop-graphql.fnshop-services.workers.dev/graphql",
	};
	const repository = await createRestApiCategoryRepository(context);
	const Category_id = 1;
	const category = await repository.CategoriesFindById(Category_id);
	expect(category).toBeObject();
	expect(category.Category_id).toBe(Category_id);
});

test("createcategory should create a new category", async () => {
	const context = {
		api_base_url: "https://fnshop-graphql.fnshop-services.workers.dev/graphql",
	};
	const repository = await createRestApiCategoryRepository(context);
	const category = { Category_id: 1, name: "Test category" };
	await repository.createCategory(category);
	// Add assertions to verify that the category was created successfully
});

test("updatecategory should update an existing category", async () => {
	const context = {
		api_base_url: "https://fnshop-graphql.fnshop-services.workers.dev/graphql",
	};
	const repository = await createRestApiCategoryRepository(context);
	const category = { Category_id: 1, name: "Updated category" };
	await repository.update(category);
	// Add assertions to verify that the category was updated successfully
});

test("deletecategory should delete a category", async () => {
	const context = {
		api_base_url: "https://fnshop-graphql.fnshop-services.workers.dev/graphql",
	};
	const repository = await createRestApiCategoryRepository(context);
	const Category_id = 1;
	const deletedProduct = await repository.delete(Category_id);
	expect(deletedProduct).toBeObject();
	expect(deletedProduct.Category_id).toBe(Category_id);
	// Add assertions to verify that the product was deleted successfully
});

test("getProductsByCategory should return a list of products for a given category", async () => {
	const context = {
		api_base_url: "https://fnshop-graphql.fnshop-services.workers.dev/graphql",
	};
	const repository = await createRestApiCategoryRepository(context);
	const category = 1;
	const products = await repository.getProductsByCategory(category);
	expect(products).toBeArray();
	// Add assertions to verify that the correct products are returned
});

test("listProducts should return a list of products", async () => {
	const context = {
		api_base_url: "https://fnshop-graphql.fnshop-services.workers.dev/graphql",
	};
	const repository = await createRestApiCategoryRepository(context);
	const page = 1;
	const pageSize = 10;
	const products = await repository.list(page, pageSize);
	expect(products).toBeArray();
	// Add assertions to verify that the correct products are returned
});
