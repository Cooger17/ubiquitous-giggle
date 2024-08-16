import type { DeleteProductCommand } from "@fnshop/domain";

export type deleteProductCommandHandler = {
	execute: (command: DeleteProductCommand) => Promise<void>;
};
