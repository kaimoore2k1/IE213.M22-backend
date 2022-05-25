import Bills from "../model/Bills"
import "reflect-metadata";

export const billResolver = {
    Query: {
        async getAllBills(_: any, arg: any, context: any) {
            return await Bills.find()
        },
        async getTheLastedBill(_: any, arg: any, context: any) {
            return await Bills.findOne().sort({'_id':-1}).limit(1)
        }
    },
    Mutation: {
        async createBill(_:any, {data}: any, context: any) {
            return await Bills.create(data)
        }
    }
}