export type CreateProductCommand = {
	productId: number;
	name: string;
	price: number;
	description: string;
	category: number;
	image: string;
	createdAt: Date;
	updatedAt: Date;
};
