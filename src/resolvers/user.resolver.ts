import Users from "../model/Users";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

export const resolvers = {
    Query: {
        async user(root: any, { _id }: any) {
            return await Users.findOne({ _id: new ObjectId(_id) });
        },
        async users() {
            const users = await Users.find({});
            return users;
        }
    },
    Mutation: {
        async createUser(_: any, { username, password, email }: any) {
            const createUser = await Users.create({ username, password, email })
            return createUser
        },
        async updateUser(_: any, { username, newUsername, newPassword, newEmail }: any) {
            const user = Users.findOne({ username: username })
            if (!user) throw new Error(`User ${username} not found`)
            const updateUser = await Users.findOneAndUpdate({ username: username }, {
                username: newUsername,
                password: newPassword,
                email: newEmail
            })
            return updateUser
        },
        async deleteUser(_: any, { username }: any) {
            const user = Users.findOne({ username: username })
            if (!user) throw new Error(`User ${username} not found`)
            await Users.findOneAndDelete({ username: username })
            return username
        }
    }
};