import type { Product } from "@fnshop/domain";

export type listProductQueryHandler = {
	execute: (query: listProductQuery) => Promise<Product[]>;
};
