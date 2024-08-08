import type { Product } from "../models/products/Product";
import type { ProductRepository } from "../repositories/ProductRepository";

/**
 * Retrieves all products from the product repository.
 *
 * @param {ProductRepository} productRepository - The repository to retrieve products from.
 * @return {Promise<Product[]>} A promise that resolves to an array of Product objects.
 */
/**
 * Retrieves all products from the product repository.
 *
 * @param {ProductRepository} productRepository - The repository to retrieve products from.
 * @return {Promise<Product[]>} A promise that resolves to an array of Product objects.
 */
export async function getProducts(
	productRepository: ProductRepository,
): Promise<Product[]> {
	return await productRepository.getProducts();
}

/**
 * Retrieves a product by its ID from the product repository.
 *
 * @param {ProductRepository} productRepository - The repository to retrieve the product from.
 * @param {number} id - The ID of the product to retrieve.
 * @return {Promise<Product>} A promise that resolves to the retrieved Product object.
 */
export async function getProductById(
	productRepository: ProductRepository,
	id: number,
): Promise<Product> {
	return await productRepository.getProductById(id);
}

/**
 * Creates a new product in the product repository.
 *
 * @param {ProductRepository} productRepository - The repository to create the product in.
 * @param {Product} product - The product to create.
 * @return {Promise<Product>} A promise that resolves to the created Product object.
 */

export async function createProduct(
	productRepository: ProductRepository,
	product: Product,
): Promise<Product> {
	return await productRepository.createProduct(product);
}

/**
 * Updates an existing product in the product repository.
 *
 * @param {ProductRepository} productRepository - The repository to update the product in.
 * @param {Product} product - The product to update.
 * @return {Promise<Product>} A promise that resolves to the updated Product object.
 */

export async function updateProduct(
	productRepository: ProductRepository,
	product: Product,
): Promise<Product> {
	return await productRepository.updateProduct(product);
}

/**
 * Deletes a product from the product repository.
 *
 * @param {ProductRepository} productRepository - The repository to delete the product from.
 * @param {number} id - The ID of the product to delete.
 * @return {Promise<void>} A promise that resolves when the product is deleted.
 */

export async function deleteProduct(
	productRepository: ProductRepository,
	id: number,
): Promise<void> {
	return await productRepository.deleteProduct(id);
}

/**
 * Retrieves products by category from the product repository.
 *
 * @param {ProductRepository} productRepository - The repository to retrieve products from.
 * @param {string} category - The category of the products to retrieve.
 * @return {Promise<Product[]>} A promise that resolves to an array of Product objects.
 */

export async function getProductsByCategory(
	productRepository: ProductRepository,
	category: string,
): Promise<Product[]> {
	return await productRepository.getProductsByCategory(category);
}
