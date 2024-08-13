import type { CategoryRepository } from "../../application/src/CategoryRepository";
import type { Category } from "../../domain/src/Category";

export const createInMemoryCategoryRepository = (): CategoryRepository => {
	const categories: Map<string, Category> = new Map();

	const repository: CategoryRepository = {
		createCategory: async (category: Category): Promise<void> => {
			if (categories.has(category.Category_id)) {
				throw new Error("Category with this ID already exists.");
			}
			categories.set(category.Category_id, category);
		},

		async delete(category_id: string): Promise<void> {
			if (!categories.has(category_id)) {
				throw new Error("Category with this ID does not exist.");
			}
			categories.delete(category_id);
		},

		async CategoriesFindById(category_id: string): Promise<Category | null> {
			const category = categories.get(category_id);
			return category ?? null;
		},

		async list(page = 1, pageSize = 10): Promise<Category[]> {
			const allCategories = Array.from(categories.values());
			return allCategories
				.slice((page - 1) * pageSize, page * pageSize)
				.map((cat) => cat as Category);
		},

		update: async (category: Category): Promise<void> => {
			if (!categories.has(category.Category_id)) {
				throw new Error("Function not implemented.");
			}
		},
	};

	return repository;
};
