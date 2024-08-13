import type { DeleteCategoryCommand } from "./DeleteCategoryCommand";

// Definr le getionnaire de suppression de la commande
export type DeleteCategoryCommandHandler = {
	execute: (command: DeleteCategoryCommand) => Promise<void>;
};
