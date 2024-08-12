import type { CreateProductCommand } from "@fnshop/domain";

const createProductCommandHandler = {
	execute: async (command: CreateProductCommand) => Promise<void>,
};
