import Products from '../model/Products';
import Comments from '../model/Comments';
import 'reflect-metadata';
import dotenv from 'dotenv';
import toSlug from '../utils/toSlug';
dotenv.config();

export const productResolvers = {
	Query: {
		async getAllProductsByCategory(_: any, { categories }: any, context: any) {
			let products = await Products.aggregate([
				{ $match: { categories: { $in: [categories] } } },
				{
					$lookup: {
						from: 'comments',
						localField: '_id',
						foreignField: 'idProduct',
						as: 'comments'
					}
				}
			]);
			//get product by category and get comments from table comment table
			return products;
		},
		async getAllProductBySearch(_: any, { valueSearch }: any, context: any) {
			const product = await Products.aggregate([
				{
					$match: {
						$or: [{ name: { $regex: valueSearch, $options: 'i' } }, { description: { $regex: valueSearch, $options: 'i' } }]
						// $text: { $search: `\"${valueSearch}\"` }
					}
				},
				{
					$lookup: {
						from: 'comments',
						localField: '_id',
						foreignField: 'idProduct',
						as: 'comments'
					}
				}
			]);
			// let products = await Products.find({
			// 	$or: [{ name: { $regex: valueSearch, $options: 'i' } }, { description: { $regex: valueSearch, $options: 'i' } }]
			// });
			return product;
		},
		async getProductByName(_: any, { slugName }: any, context: any) {
			const product = await Products.aggregate([
				{ $match: { slugName: slugName } },
				{
					$lookup: {
						from: 'comments',
						localField: '_id',
						foreignField: 'idProduct',
						as: 'comments'
					}
				}
			]);

			return product[0];
		},
		async getAllProducts(_: any, arg: any, context: any) {
			let products = await Products.aggregate([
				{
					$lookup: {
						from: 'comments',
						localField: '_id',
						foreignField: 'idProduct',
						as: 'comments'
					}
				}
			]);
			return products;
		},
		async getProductById(_: any, {_id}: any, context: any) {
			return Products.findById(_id)
		}
	},
	Mutation: {
		async deleteProductByName(_: any, { name }: any, context: any) {
			return Products.findOneAndDelete({name})
		},
		async updateProductByName(_: any, { name, data }: any, context: any) {
			const getProduct = await Products.find({ name });
			if (getProduct[0]) {
				return await Products.findOneAndUpdate(
					{ name },
					{
						name: data.name,
						price: data.price,
						stock: data.stock,
						salePrice: data.salePrice,
						categories: data.categories,
						description: data.description,
						content: data.content,
						slugName: data.slugName
					}
				);
			} else {
				return await Products.create({
					name: data.name,
					price: data.price,
					stock: data.stock,
					salePrice: data.salePrice,
					categories: data.categories,
					description: data.description,
					content: data.content,
					slugName: data.slugName
				});
			}
		}
	}
};
