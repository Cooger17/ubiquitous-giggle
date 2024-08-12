import { z } from "zod";

const ProductSchema = z.object({
	productId: z.number(),
	name: z.string(),
	description: z.string(),
	price: z.number(),
	image: z.string(),
	category: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

const CreateProductCommand = z.object({
	id: z.number(),
	name: z.string(),
	price: z.number(),
	description: z.string().optional(),
});

export type Product = Readonly<z.infer<typeof ProductSchema>>;
export type CreateProductCommand = z.infer<typeof CreateProductCommand>;
