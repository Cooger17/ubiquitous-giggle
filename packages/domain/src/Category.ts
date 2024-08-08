import { number, z } from "zod";

export const Category = z.object({
	Category_id: z.string(),
	name: z.string().min(3, "Must contains at least 3 characters"),
});

export type Category = Readonly<z.infer<typeof Category>>;

export const CategorySchema = z.object({
	id: z.number(),
	name: z.string().min(3, "Must contains at least 3 characters"),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type CategorySchemaType = z.infer<typeof CategorySchema>;
