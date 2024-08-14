import type { CategoryRepository } from "../CategoryRepository";
import type { DeleteCategoryCommand } from "../commands/DeleteCategoryCommand";
import type { DeleteCategoryCommandHandler } from "../commands/DeleteCategoryCommandHandler";

export const DeleteCategoryHandler = (context: {
	category_repository: CategoryRepository;
}): DeleteCategoryCommandHandler => {
	const { category_repository } = context;

	const command_handler: DeleteCategoryCommandHandler = {
		execute: async (command: DeleteCategoryCommand) => {
			await category_repository.delete(command.Category_id);
		},
	};

	return command_handler;
};
