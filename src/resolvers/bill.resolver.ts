import Bills from "../model/Bills"
import "reflect-metadata";

export const billResolver = {
    Query: {
        async getAllBills(_: any, arg: any, context: any) {
            return await Bills.find()
        },
        async getTheLastedBill(_: any, arg: any, context: any) {
            return await Bills.findOne().sort({'_id':-1}).limit(1)
        },
        async getBillProductById(_:any, {_id}: any, context: any) {
            
            const a = await Bills.findById(_id)
            return a.products
        }
    },
    Mutation: {
        async createBill(_:any, {data}: any, context: any) {
            return await Bills.create(data)
        },
        async deleteBillById(_:any, {_id}: any, context: any) {
            return await Bills.findByIdAndRemove(_id)
        }
    }
}