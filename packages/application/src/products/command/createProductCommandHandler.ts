import type { CreateProductCommand } from "@fnshop/domain";

export type CreateProductCommandHandler = {
	execute: (command: CreateProductCommand) => Promise<void>;
};
