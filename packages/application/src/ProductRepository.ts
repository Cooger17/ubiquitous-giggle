import type { CategorySchemaType } from "../../domain/src/Category";

export type CategoryRepositories = {
	getAllCategories(): Promise<CategorySchemaType[]>;
	getCategoriesFindById(id: number): Promise<CategorySchemaType[]>;
	creategory: (Category: CategorySchemaType) => Promise<void>;
	delete: (id: number) => Promise<void>;
	list: (page?: number, pageSize?: number) => Promise<CategorySchemaType[]>;
};
// export interface CategoryRepositories {
//   getAllCategories(): Promise<CategorySchemaType[]>;
//   getCategoriesById(id: number): Promise<CategorySchemaType[]>;
//   creategory(Category: CategorySchemaType): Promise<void>;
// };
