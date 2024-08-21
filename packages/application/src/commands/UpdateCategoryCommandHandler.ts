// import { Category } from "@fnshop/domain/src/Category";
// import type { CategoryRepository } from "../CategoryRepository";
// import { UpdateCategoryCommand } from "./UpdateCategoryCommand";

// export type UpdateCategoryCommandHandler = {
//   execute: (command: UpdateCategoryCommand) => Promise<void>;
// };

// export const createCreateCategoryCommandHandler = (context: {
//   category_repository: CategoryRepository;
// }): UpdateCategoryCommandHandler => {
//   const { category_repository } = context;

//   const command_handler: UpdateCategoryCommandHandler = {
//     execute: async (command: UpdateCategoryCommand) => {
//       if (!command.Category_id || !command.name) {
//         throw new Error("Category_id and name are required.");
//       }
//       const category = {
//         Category_id: command.Category_id,
//         name: command.name,
//       };

//       await category_repository.update(category);
//     },
//   };

//   return command_handler;
// };

import type { CategoryRepository } from "../CategoryRepository";
import type { UpdateCategoryCommand } from "./UpdateCategoryCommand";

export type UpdateCategoryCommandHandler = {
	execute: (command: UpdateCategoryCommand) => Promise<void>;
};

export const createUpdateCategoryCommandHandler = (context: {
	category_repository: CategoryRepository;
}): UpdateCategoryCommandHandler => {
	const { category_repository } = context;

	const command_handler: UpdateCategoryCommandHandler = {
		execute: async (command: UpdateCategoryCommand) => {
			if (!command.category_id || !command.name) {
				throw new Error("Category_id and name are required.");
			}

			const category = {
				category_id: command.category_id,
				name: command.name,
			};

			await category_repository.update(category);
		},
	};

	return command_handler;
};
