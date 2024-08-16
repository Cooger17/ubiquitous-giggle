import type { CreateProductCommand, Product } from "@fnshop/domain";

export type CreateProductCommandHandler = {
	execute: (command: CreateProductCommand) => Promise<Product>;
};
