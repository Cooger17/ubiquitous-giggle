import type { Category } from "../../domain/src/Category";

export type CategoryRepository = {
	createCategory: (category: Category) => Promise<void>;

	CategoriesFindById(Category_id: string): Promise<Category | null>;

	update: (category: Category) => Promise<void>;

	delete: (Category_id: string) => Promise<void>;

	list: (page?: number, pageSize?: number) => Promise<Category[]>;
};
// export interface CategoryRepositories {
//   getAllCategories(): Promise<CategorySchemaType[]>;
//   getCategoriesById(id: number): Promise<CategorySchemaType[]>;
//   creategory(Category: CategorySchemaType): Promise<void>;
// };
