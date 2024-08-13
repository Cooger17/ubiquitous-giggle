import type { DeleteProductCommand } from "@fnshop/domain";
import type { ProductRepository } from "../ProductRepository";
import type { deleteProductCommandHandler } from "../command/deleteProductCommandHandler";

export const createDeleteProductCommandHandler = (context: {
	product_repository: ProductRepository;
}): deleteProductCommandHandler => {
	if (!context || !context.product_repository) {
		throw new Error(
			"createDeleteProductCommandHandler: context or product_repository is undefined",
		);
	}

	const { product_repository } = context;
	const command_handler: deleteProductCommandHandler = {
		execute: async (command: DeleteProductCommand) => {
			if (!command) {
				throw new Error(
					"createDeleteProductCommandHandler: command is undefined",
				);
			}

			try {
				await product_repository.deleteProduct(command.id);
			} catch (error) {
				throw new Error(
					`createDeleteProductCommandHandler: Failed to delete product: ${error}`,
				);
			}
		},
	};

	return command_handler;
};
