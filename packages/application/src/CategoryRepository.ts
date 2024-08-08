import type { Category } from "../../domain/src/Category";

export type CategoryRepository = {
	createcategory: (category: Category) => Promise<void>;

	CategoriesFindById(category_id: string): Promise<Category | null>;

	update: (category: Category) => Promise<void>;

	delete: (category_id: string) => Promise<void>;

	list: (page?: number, pageSize?: number) => Promise<Category[]>;
};
// export interface CategoryRepositories {
//   getAllCategories(): Promise<CategorySchemaType[]>;
//   getCategoriesById(id: number): Promise<CategorySchemaType[]>;
//   creategory(Category: CategorySchemaType): Promise<void>;
// };
