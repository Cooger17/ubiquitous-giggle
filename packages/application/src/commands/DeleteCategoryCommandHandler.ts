import type { CategoryRepository } from "../CategoryRepository";
import type { DeleteCategoryCommand } from "./DeleteCategoryCommand";

// Definr le getionnaire de suppression de la commande
export type DeleteCategoryCommandHandler = {
	execute: (command: DeleteCategoryCommand) => Promise<void>;
};

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
