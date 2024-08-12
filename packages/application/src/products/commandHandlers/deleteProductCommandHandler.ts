import type { DeleteProductCommand } from "@fnshop/domain";

const deleteProductCommandHandler = {
	execute: async (command: DeleteProductCommand) => Promise<void>,
};
