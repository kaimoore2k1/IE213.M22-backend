import Blogs from "../model/Blogs";
import "reflect-metadata";

export const blogResolvers = {
    Query: {
        async getAllBlogs(_: any, a: any, context: any) {
            let blogs = await Blogs.aggregate([
                {
                    $lookup: {
                        "from": "comments",
                        "localField": "_id",
                        "foreignField": "idBlog",
                        "as": "comments"
                    }
                }])
            //get product by category and get comments from table comment table
            return blogs
        },
        async getHotBlogs(_: any, a: any, context: any) {
            let blogs = await Blogs.aggregate([{ $sort: { "like": -1 } }, {
                $lookup: {
                    "from": "comments",
                    "localField": "_id",
                    "foreignField": "idBlog",
                    "as": "comments"
                }
            }])
            return blogs
        },
        async getBlogBySlug(_: any, { slug }: any, ontext: any) {
            let blog = await Blogs.findOne({ slug: slug })
            return blog
        }
    },
    Mutation: {
        async createBlog(_: any, { title, image, author, category, description, content, slug }: any, context: any) {
            let blog = new Blogs({
                title: title,
                date: new Date,
                image: image,
                author: author,
                category: category,
                description: description,
                content: content,
                slug: slug
            })
            await blog.save()
            return blog
        },
        async updateBlog(_: any, { _id, title, image, author, category, description, content, slug }: any, context: any) {
            let blog = await Blogs.findOne({ _id: _id })
            blog.title = title
            blog.image = image
            blog.author = author
            blog.category = category
            blog.description = description
            blog.content = content
            blog.slug = slug
            await blog.save()
            return blog
        },
        async deleteBlog(_: any, { _id }: any, context: any) {
            let blog = await Blogs.findOne({ _id: _id })
            await blog.remove()
            return blog
        }, 
        async likeBlog(_: any, { _id,user }: any, context: any) {
            let blog = await Blogs.findOne({ _id: _id })
            if (blog.like.includes(user)) {
                blog.like.splice(blog.like.indexOf(user), 1)
            } else {
                blog.like.push(user)
            }
            await blog.save()
            return blog
        }
    }
}
