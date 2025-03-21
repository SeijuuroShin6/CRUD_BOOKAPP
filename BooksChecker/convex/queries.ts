import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


// Create Function
export const createBooks = mutation({
    args: {title: v.string(), author: v.string() },
    handler: async (ctx, args) => {
        const newBookId = await ctx.db.insert("books", {
            title: args.title,
            author: args.author,
            isCompleted: false,
        });
        return newBookId
    },
});


// Read Function
export const getBooks = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("books").collect();
    }
})


// Update Function 
export const UpdateStatus = mutation({
    args: {id: v.id("books"), isCompleted: v.boolean()},
    handler: async (ctx, args) => {
        const { id } = args;
        await ctx.db.patch(id, { isCompleted: args.isCompleted});
        return "Book Updated"
    },
});


// Delete Function
export const deleteBooks = mutation({
    args: {id: v.id("books")},
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
        return "Books Delete"
    }
})
