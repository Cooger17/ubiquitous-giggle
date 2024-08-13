import { Category } from "../../domain/src/Category";
import type { CreateCategoryCommand } from "../commands/CreateCategoryCommand";
import type { CreateCategoryCommandHandler } from "../commands/CreateCategoryCommandHandler";
import type { CategoryRepository } from "../src/CategoryRepository";

export const CreateCategoryHandler = (context: {
	category_repository: CategoryRepository;
}): CreateCategoryCommandHandler => {
	const { category_repository } = context;

	const command_handler: CreateCategoryCommandHandler = {
		execute: async (command: CreateCategoryCommand) => {
			if (!command.Category_id || !command.name) {
				throw new Error("Category_id and name are required.");
			}
			const category = {
				Category_id: command.Category_id,
				name: command.name,
			};

			await category_repository.createCategory(category);
		},
	};

	return command_handler;
};
