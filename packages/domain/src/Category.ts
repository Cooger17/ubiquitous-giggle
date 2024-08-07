import { z } from "zod";

export const CategorySchema = z.object({
	name: z.string().min(3, "Must contains at least 3 characters"),
});

export type CategorySchemaType = z.infer<typeof CategorySchema>;
