import type { Category } from "@fnshop/domain/src/Category";
import type { CategoryRepository } from "../CategoryRepository";
import type { GetCategoryByIdQuery } from "../query/GetCategoryByIdQuery";

export class GetCategoryByIdHandler {
	constructor(private categoryRepository: CategoryRepository) {}

	async handle(query: GetCategoryByIdQuery): Promise<Category | null> {
		// Récupère la catégorie depuis le repository
		return await this.categoryRepository.CategoriesFindById(query.id);
	}
}
