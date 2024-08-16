import type { CreateProductCommand, Product } from "@fnshop/domain";
import type { ProductRepository } from "../ProductRepository";
import type { CreateProductCommandHandler } from "../command/createProductCommandHandler";

export const createCreateProductCommandHandler = (context: {
	product_repository: ProductRepository;
}): CreateProductCommandHandler => {
	if (!context || !context.product_repository) {
		throw new Error(
			"createCreateProductCommandHandler: context or product_repository is undefined",
		);
	}

	const { product_repository } = context;
	const command_handler: CreateProductCommandHandler = {
		execute: async (command: CreateProductCommand) => {
			if (!command) {
				throw new Error(
					"createCreateProductCommandHandler: command is undefined",
				);
			}

			const product: Product = {
				productId: command.productId,
				name: command.name,
				description: command.description || "",
				price: command.price,
				image: command.image || "",
				category: command.category || 0,
				createdAt: command.createdAt || new Date(),
				updatedAt: command.updatedAt || new Date(),
			};

			try {
				await product_repository.createProduct(product);
				return product;
			} catch (error) {
				throw new Error(
					`createCreateProductCommandHandler: Failed to create product: ${error}`,
				);
			}
		},
	};

	return command_handler;
};
