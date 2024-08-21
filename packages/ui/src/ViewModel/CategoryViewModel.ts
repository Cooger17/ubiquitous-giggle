// import type { CategoryRepository } from "packages/application/src/CategoryRepository";
// import { DeleteCategoryHandler } from "packages/application/src/commands/DeleteCategoryCommandHandler";
// import { createUpdateCategoryCommandHandler } from "packages/application/src/commands/UpdateCategoryCommandHandler";
// import type { Category } from "packages/domain/src/Category";
import { useState } from "react";
// import { createCreateCategoryCommandHandler } from "../../src/commands/CreateCategoryCommandHandler";

import type { Category } from "@fnshop/domain";
import { createCreateCategoryCommandHandler } from "../../src/commands/CreateCategoryCommandHandler";
import { DeleteCategoryHandler } from "../../src/commands/DeleteCategoryCommandHandler";
import { createUpdateCategoryCommandHandler } from "../../src/commands/UpdateCategoryCommandHandler";

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
		// Crée un gestionnaire de commandes pour la création de catégories
		const command_handler = createCreateCategoryCommandHandler({
			category_repository,
		});

		try {
			// Exécute la commande de création de catégorie
			await command_handler.execute(command);
			// Récupère la liste mise à jour des catégories après la création
			const updatedCategories = await category_repository.list();
			setCategories(updatedCategories); // Met à jour l'état avec les catégories mises à jour
		} catch (err: unknown) {
			// Gestion des erreurs
			if (err instanceof Error) {
				setError(err.message); // Définit l'erreur dans l'état si elle est une instance de Error
			} else {
				setError("Une erreur inconnue est survenue."); // Erreur générique pour les autres cas
			}
		}
	};

	// Méthode pour récupérer une catégorie par ID
	const getCategoryById = async (id: string) => {
		try {
			// Récupère la catégorie par ID depuis le dépôt
			const fetchedCategory = await category_repository.CategoriesFindById(id);
			setCategory(fetchedCategory); // Met à jour l'état avec la catégorie récupérée
		} catch (err: unknown) {
			// Gestion des erreurs
			if (err instanceof Error) {
				setError(err.message); // Définit l'erreur dans l'état si elle est une instance de Error
			} else {
				setError("Une erreur inconnue est survenue."); // Erreur générique pour les autres cas
			}
		}
	};

	// Méthode pour mettre à jour une catégorie existante
	const updateCategory = async (command: Category) => {
		// Crée un gestionnaire de commandes pour la mise à jour de catégories
		const command_handler = createUpdateCategoryCommandHandler({
			category_repository,
		});

		try {
			// Exécute la commande de mise à jour de catégorie
			await command_handler.execute(command);
			// Récupère la liste mise à jour des catégories après la mise à jour
			const updatedCategories = await category_repository.list();
			setCategories(updatedCategories); // Met à jour l'état avec les catégories mises à jour
		} catch (err: unknown) {
			// Gestion des erreurs
			if (err instanceof Error) {
				setError(err.message); // Définit l'erreur dans l'état si elle est une instance de Error
			} else {
				setError("Une erreur inconnue est survenue."); // Erreur générique pour les autres cas
			}
		}
	};

	// Méthode pour supprimer une catégorie par ID
	const deleteCategory = async (id: string) => {
		// Crée un gestionnaire de commandes pour la suppression de catégories
		const command_handler = DeleteCategoryHandler({
			category_repository,
		});

		try {
			// Exécute la commande de suppression de catégorie
			await command_handler.execute({ Category_id: id });
			// Récupère la liste mise à jour des catégories après la suppression
			const updatedCategories = await category_repository.list();
			setCategories(updatedCategories); // Met à jour l'état avec les catégories mises à jour
		} catch (err: unknown) {
			// Gestion des erreurs
			if (err instanceof Error) {
				setError(err.message); // Définit l'erreur dans l'état si elle est une instance de Error
			} else {
				setError("Une erreur inconnue est survenue."); // Erreur générique pour les autres cas
			}
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
