import type { CategoryRepository } from "../../application/src/CategoryRepository";
import { type Category, CategorySchemaType } from "../../domain/src/Category";

export const createInMemoryCategoryRepository = (): CategoryRepository => {
	const categories: Map<string, Category> = new Map();

	const repository: CategoryRepository = {
		createcategory: async (category: Category): Promise<void> => {
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
		update: (category: Category): Promise<void> => {
			throw new Error("Function not implemented.");
		},
	};

	return repository;
};

// import { CategoryRepository } from "../../application/src/CategoryRepository";
// import { Category, CategorySchemaType} from "../../domain/src/Category";

// export const createInMemoryProductRepository = (): CategoryRepository  => {
//  const categories: Map<string, Category> = new Map();

//  const repository: CategoryRepository = {
//     createcategory: (Category_id: string) => {
//     if (categories.has(Category_id)) {
//             throw new Error('Product with this ID already exists.');
//         }
//         categories.set(categories.Category_id, Category);
//     },
//     deleteCategory: (category_id: string) => {
//         if (!categories.has(category_id)) {
//             throw new Error('Category with this ID does not exist.');
//         }
//         categories.delete(category_id);
//         },
//         findById: (category_id: string) => {
//             const category = categories.get(category_id);
//             if (!category) {
//                 throw new Error('Category not found.');
//             }
//             return category;
//             },
//     };
//     };

//  return repository <void>
// };
