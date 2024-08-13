import type { CategoryRepository } from "../../application/src/CategoryRepository";
import type { Category } from "../../domain/src/Category";

export const createRestApiCategoryRepository = async (context: {
	api_base_url: string;
}): Promise<CategoryRepository> => {
	const { api_base_url } = context;

	const repository: CategoryRepository = {
		createCategory: async (category: Category) => {
			const response = await fetch(`${api_base_url}/categories`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(category),
			});

			if (!response.ok) {
				throw new Error(`Failed to create category: ${response.statusText}`);
			}
		},
		CategoriesFindById: async (
			category_id: string,
		): Promise<Category | null> => {
			const response = await fetch(`${api_base_url}/categories/${category_id}`);
			const category = await response.json();
			if (!response.ok) {
				throw new Error(`: ${response.statusText}`);
			}
			return category;
		},
		delete: async (category_id: string) => {
			const response = await fetch(
				`${api_base_url}/categories/${category_id}`,
				{
					method: "DELETE",
					headers: {
						"content-type": "application/json",
					},
				},
			);
			if (!response.ok) {
				throw new Error(
					`Échec de la suppression de la catégorie : ${response.statusText}`,
				);
			}
		},
		update: async (category: Category) => {
			const response = await fetch(
				`${api_base_url}/categories/${category.Category_id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(category),
				},
			);

			if (!response.ok) {
				throw new Error(
					`Échec de la mise à jour de la catégorie : ${response.statusText}`,
				);
			}
		},
		list: async (page?: number, pageSize?: number): Promise<Category[]> => {
			const response = await fetch(
				`${api_base_url}/categories?page=${page}&pageSize=${pageSize}`,
			);
			if (!response.ok) {
				throw new Error(`Failed to get products: ${response.statusText}`);
			}
			const categories = await response.json();
			return categories;
		},
	};

	return repository;
};

// import { CategoryRepository } from "../../application/src/CategoryRepository";
// import { Category } from "../../domain/src/Category";

// export const createRestAPIProductRepository = async (context: {api_base_url: string}): Promise<CategoryRepository>  => {
//     const { api_base_url } = context
//     const repository: CategoryRepository = {
//       createcategory: async (category: Category) => {
//         const response = await fetch(`${this.baseUrl}/products`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(category),
//         });
//         if (!response.ok) {
//           throw new Error(`Failed to create product: ${response.statusText}`);
//         }
//       },
//     };
//  return repository
// }
