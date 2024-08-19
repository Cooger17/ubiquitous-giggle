import type { CategoryRepository } from "packages/application/src/CategoryRepository";
import { DeleteCategoryHandler } from "packages/application/src/commands/DeleteCategoryCommandHandler";
import { createUpdateCategoryCommandHandler } from "packages/application/src/commands/UpdateCategoryCommandHandler";
import type { Category } from "packages/domain/src/Category";
import { useState } from "react";
import { createCreateCategoryCommandHandler } from "../../src/commands/CreateCategoryCommandHandler";

// ViewModel pour gérer les catégories
// export const useCategoryViewModel = (
//   category_repository: CategoryRepository
// ) => {
//   // État local pour stocker les catégories récupérées
//   const [categories, setCategories] = useState<Category[]>([]);

//   // État local pour gérer les erreurs
//   const [error, setError] = useState<string | null>(null);

//   // Fonction pour créer une nouvelle catégorie
//   const createCategory = async (command: Category) => {
//     // Créer un gestionnaire de commande pour exécuter la création de catégorie
//     const command_handler = createCreateCategoryCommandHandler({
//       category_repository,
//     });

//     try {
//       // Exécuter la commande et mettre à jour la liste des catégories
//       await command_handler.execute(command);
//       const updatedCategories = await category_repository.list();
//       setCategories(updatedCategories);
//     } catch (err) {
//       // En cas d'erreur, stocker le message d'erreur
//       setError(err.message);
//     }
//   };

//   // Retourner l'état, la fonction de création de catégorie, et l'erreur
//   return {
//     categories,
//     createCategory,
//     error,
//   };
// };

export const useCategoryViewModel = (
	category_repository: CategoryRepository, // Dépendance au dépôt des catégories pour interagir avec les données
) => {
	// États locaux pour stocker les catégories, les erreurs éventuelles, et une catégorie spécifique
	const [categories, setCategories] = useState<Category[]>([]);
	const [category, setCategory] = useState<Category | null>(null);
	const [error, setError] = useState<string | null>(null);

	// Méthode pour créer une nouvelle catégorie
	const createCategory = async (command: Category) => {
		const command_handler = createCreateCategoryCommandHandler({
			category_repository,
		});

		try {
			await command_handler.execute(command);
			const updatedCategories = await category_repository.list();
			setCategories(updatedCategories);
		} catch (err) {
			setError(err.message);
		}
	};

	// Méthode pour récupérer une catégorie par ID
	const getCategoryById = async (id: string) => {
		try {
			const fetchedCategory = await category_repository.CategoriesFindById(id);
			setCategory(fetchedCategory);
		} catch (err) {
			setError(err.message);
		}
	};

	// Méthode pour mettre à jour une catégorie existante
	const updateCategory = async (command: Category) => {
		const command_handler = createUpdateCategoryCommandHandler({
			category_repository,
		});

		try {
			await command_handler.execute(command);
			const updatedCategories = await category_repository.list();
			setCategories(updatedCategories);
		} catch (err) {
			setError(err.message);
		}
	};

	// Méthode pour supprimer une catégorie par ID
	const deleteCategory = async (id: string) => {
		const command_handler = DeleteCategoryHandler({
			category_repository,
		});

		try {
			await command_handler.execute({ Category_id: id });
			const updatedCategories = await category_repository.list();
			setCategories(updatedCategories);
		} catch (err) {
			setError(err.message);
		}
	};

	// Retourne les données et les méthodes CRUD disponibles pour le ViewModel
	return {
		categories, // Liste des catégories disponibles
		category, // Une catégorie spécifique
		createCategory, // Méthode pour créer une nouvelle catégorie
		getCategoryById, // Méthode pour récupérer une catégorie par ID
		updateCategory, // Méthode pour mettre à jour une catégorie
		deleteCategory, // Méthode pour supprimer une catégorie
		error, // Erreur éventuelle lors de l'exécution d'une commande
	};
};
