import type { ProductRepository } from "../ProductRepository";
import type { listProductQueryHandler } from "./listProductQueryHandler";

export const createListProductQueryHandler = (context: {
	product_repository: ProductRepository;
}): listProductQueryHandler => {
	if (!context || !context.product_repository) {
		throw new Error(
			"createListProductQueryHandler: context or product_repository is undefined",
		);
	}

	const { product_repository } = context;
	const query_handler: listProductQueryHandler = {
		execute: async (query: listProductQuery) => {
			if (!query) {
				throw new Error("createListProductQueryHandler: query is undefined");
			}

			try {
				return await product_repository.listProducts();
			} catch (error) {
				throw new Error(
					`createListProductQueryHandler: Failed to list products: ${error}`,
				);
			}
		},
	};

	return query_handler;
};
