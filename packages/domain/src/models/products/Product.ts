import { z } from "zod";

export const ProductSchema = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string(),
	price: z.number(),
	image: z.string(),
	category: z.string(),
	rating: z.number().optional(),
});

export type Product = z.infer<typeof ProductSchema>;
