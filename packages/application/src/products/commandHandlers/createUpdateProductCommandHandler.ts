import type { Product, UpdateProductCommand } from "@fnshop/domain";
import type { ProductRepository } from "../ProductRepository";
import type { UpdateProductCommandHandler } from "../command/updateProductCommandHandler";

export const createUpdateProductCommandHandler = (context: {
	product_repository: ProductRepository;
}): UpdateProductCommandHandler => {
	if (!context || !context.product_repository) {
		throw new Error(
			"createUpdateProductCommandHandler: context or product_repository is undefined",
		);
	}

	const { product_repository } = context;
	const command_handler: UpdateProductCommandHandler = {
		execute: async (command: UpdateProductCommand) => {
			if (!command) {
				throw new Error(
					"createUpdateProductCommandHandler: command is undefined",
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
				await product_repository.updateProduct(product);
			} catch (error) {
				throw new Error(
					`createUpdateProductCommandHandler: Failed to update product: ${error}`,
				);
			}
		},
	};

	return command_handler;
};
