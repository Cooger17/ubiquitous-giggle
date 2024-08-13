import type { CreateCategoryCommand } from "./CreateCategoryCommand";

export type CreateCategoryCommandHandler = {
	execute: (command: CreateCategoryCommand) => Promise<void>;
};
