import type { CategorySchemaType } from "./packages/domain/src/Category";

export type CategoryRepositories = {
	getAllCategories(): Promise<CategorySchemaType[]>;
	getCategoriesById(id: number): Promise<CategorySchemaType[]>;
	creategory(Category: CategorySchemaType): Promise<void>;
};

// export interface CategoryRepositories {
//   getAllCategories(): Promise<CategorySchemaType[]>;
//   getCategoriesById(id: number): Promise<CategorySchemaType[]>;
//   creategory(Category: CategorySchemaType): Promise<void>;
// };
