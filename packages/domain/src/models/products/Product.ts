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
	image: z.string().optional(),
	category: z.number().optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

const UpdateProductCommand = z.object({
	id: z.number(),
	name: z.string(),
	price: z.number(),
	description: z.string().optional(),
	image: z.string().optional(),
	category: z.number().optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

const DeleteProductCommand = z.object({
	id: z.number(),
});

export type Product = Readonly<z.infer<typeof ProductSchema>>;
export type CreateProductCommand = Readonly<
	z.infer<typeof CreateProductCommand>
>;
export type UpdateProductCommand = Readonly<
	z.infer<typeof UpdateProductCommand>
>;
export type DeleteProductCommand = Readonly<
	z.infer<typeof DeleteProductCommand>
>;
