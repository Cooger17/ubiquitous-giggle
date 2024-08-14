import { describe, expect, it } from "bun:test";
import type { Category } from "@fnshop/domain/src/Category";
import { createCreateCategoryCommandHandler } from "../../src/commands/CreateCategoryCommandHandler";
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

describe("list", () => {});
