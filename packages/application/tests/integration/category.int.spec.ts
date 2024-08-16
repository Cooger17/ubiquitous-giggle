import { describe, expect, it } from "bun:test";
import type { Category } from "@fnshop/domain/src/Category";
import type { CreateCategoryCommand } from "../../src/commands/CreateCategoryCommand";
import { createCreateCategoryCommandHandler } from "../../src/commands/CreateCategoryCommandHandler";
import type { DeleteCategoryCommand } from "../../src/commands/DeleteCategoryCommand";
import { DeleteCategoryHandler } from "../../src/commands/DeleteCategoryCommandHandler";
import type { UpdateCategoryCommand } from "../../src/commands/UpdateCategoryCommand";
import {
	UpdateCategoryCommandHandler,
	createUpdateCategoryCommandHandler,
} from "../../src/commands/UpdateCategoryCommandHandler";
import { createInMemoryCategoryRepository } from "./../../../infra/src/in-memory-category-repository";

describe("Category", () => {
	describe("createCategory", () => {
		it("should create a category", async () => {
			// ARRANGE : prepare test
			const category_repository = createInMemoryCategoryRepository();
			const command_handler = createCreateCategoryCommandHandler({
				category_repository,
			});

			const command: Category = {
				Category_id: "1",
				name: "test",
			};

			//ACT : Execute le teste
			await command_handler.execute(command);

			const category = await category_repository.CategoriesFindById("1");
			//ASSERT
			//exepct(true).toBe(true)

			expect(category).not.toBeUndefined();
			expect(category?.Category_id).toBe(command.Category_id);
		});
	});
});

describe("deleteCategory", () => {
	it("should delete a category", async () => {
		//ARRANGE
		const category_repository = createInMemoryCategoryRepository();
		const create_command_handler = createCreateCategoryCommandHandler({
			category_repository,
		});
		const delete_command_handler = DeleteCategoryHandler({
			category_repository,
		});

		const create_command: CreateCategoryCommand = {
			Category_id: "1",
			name: "test delete",
		};

		await create_command_handler.execute(create_command);

		const create_category = await category_repository.CategoriesFindById("1");

		console.log(create_category);

		// ACT

		const delete_command: DeleteCategoryCommand = {
			Category_id: "1",
		};

		await delete_command_handler.execute(delete_command);

		const delete_category = await category_repository.CategoriesFindById("1");

		// ASSERT
		expect(delete_category).not.toBeUndefined();
		expect(delete_category).toBeNull();
	});
});

describe("UpdateCategoryCommandHandler", () => {
	it("should update a category successfully", async () => {
		// ARRANGE
		const category_repository = createInMemoryCategoryRepository();
		const create_command_handler = createCreateCategoryCommandHandler({
			category_repository,
		});
		const update_command_handler = createUpdateCategoryCommandHandler({
			category_repository,
		});

		const create_command: CreateCategoryCommand = {
			Category_id: "1",
			name: "Initial Category Name",
		};

		await create_command_handler.execute(create_command);

		const created_category = await category_repository.CategoriesFindById("1");
		console.log("Created Category:", created_category);

		// ACT
		const update_command: UpdateCategoryCommand = {
			Category_id: "1",
			name: "Updated Category Name",
		};

		await update_command_handler.execute(update_command);

		const updated_category = await category_repository.CategoriesFindById("1");

		// ASSERT
		expect(updated_category).toBeDefined();
		expect(updated_category?.name).toBe("Updated Category Name");
	});

	it("should throw an error if Category_id or name is missing", async () => {
		// ARRANGE
		const category_repository = createInMemoryCategoryRepository();
		const update_command_handler = createUpdateCategoryCommandHandler({
			category_repository,
		});

		const invalid_command: UpdateCategoryCommand = {
			Category_id: "",
			name: "",
		};

		// ACT & ASSERT
		await expect(
			update_command_handler.execute(invalid_command),
		).rejects.toThrow("Category_id and name are required.");
	});
});

describe("CategoryRepository", () => {
	it("should list categories with pagination", async () => {
		// ARRANGE
		const category_repository = createInMemoryCategoryRepository();
		const create_command_handler = createCreateCategoryCommandHandler({
			category_repository,
		});

		// Create several categories
		const categoriesToCreate: CreateCategoryCommand[] = [
			{ Category_id: "1", name: "Category 1" },
			{ Category_id: "2", name: "Category 2" },
			{ Category_id: "3", name: "Category 3" },
			{ Category_id: "4", name: "Category 4" },
			{ Category_id: "5", name: "Category 5" },
		];

		for (const command of categoriesToCreate) {
			await create_command_handler.execute(command);
		}

		// ACT
		const page = 1;
		const pageSize = 3;
		const categories = await category_repository.list(page, pageSize);

		// ASSERT
		expect(categories).toHaveLength(pageSize);
		expect(categories[0].name).toBe("Category 1");
		expect(categories[1].name).toBe("Category 2");
		expect(categories[2].name).toBe("Category 3");
	});

	it("should return an empty list if no categories exist", async () => {
		// ARRANGE
		const category_repository = createInMemoryCategoryRepository();

		// ACT
		const categories = await category_repository.list();

		// ASSERT
		expect(categories).toHaveLength(0);
	});
});
