import { gql } from 'apollo-server'

export const billTypeDefs = gql`
    type BillProduct {
        name: String,
        quantity: Int,
        price: Int
    }
    type Bill {
        products: [BillProduct],
        firstName: String,
        lastName: String,
        address: String,
        numberPhone: String,
        total: Int,
        amount: Int,
        date: String,
        paymentMethod: String,
        _id: String
    }
    input InputBillProduct {
        name: String,
        quantity: Int,
        price: Int
    }
    input InputBill {
        products: [InputBillProduct],
        firstName: String,
        lastName: String,
        address: String,
        numberPhone: String,
        total: Int,
        amount: Int,
        date: String,
        paymentMethod: String
    }
    type Query {
        getAllBills: [Bill],
        getTheLastedBill: Bill
        getBillProductById(_id: String): [BillProduct]
    }
    type Mutation {
        createBill(
            data: InputBill
        ): Bill,
        deleteBillById(_id: String): Bill
    }
`