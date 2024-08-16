import type { UpdateProductCommand } from "@fnshop/domain";

export type UpdateProductCommandHandler = {
	execute: (command: UpdateProductCommand) => Promise<void>;
};
