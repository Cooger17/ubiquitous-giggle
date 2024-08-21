import type { Category } from "../../domain/src/Category";

export type CategoryRepository = {
	CategoriesSet(
		category_id: number,
		existingCategory: { category_id: number; name: string },
	): unknown;
	createCategory: (category: Category) => Promise<void>;

	CategoriesFindById(category_id: number): Promise<Category | null>;

	update: (category: Category) => Promise<void>;

	delete: (category_id: number) => Promise<void>;

	list: (page?: number, pageSize?: number) => Promise<Category[]>;

	CategoriesSet(category_id: number, category: Category): Promise<void>;
};
// export interface CategoryRepositories {
//   getAllCategories(): Promise<CategorySchemaType[]>;
//   getCategoriesById(id: number): Promise<CategorySchemaType[]>;
//   creategory(Category: CategorySchemaType): Promise<void>;
// };
