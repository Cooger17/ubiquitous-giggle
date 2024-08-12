import type { Product } from "@fnshop/domain";

type listProductQueryHandler = {
	execute: (query: listProductQuery) => Promise<Product[]>;
};
