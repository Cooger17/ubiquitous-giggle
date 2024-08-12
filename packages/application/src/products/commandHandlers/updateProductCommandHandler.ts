import type { UpdateProductCommand } from "@fnshop/domain";

const updateProductCommandHandler = {
	execute: async (command: UpdateProductCommand) => Promise<void>,
};
