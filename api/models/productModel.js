const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter product Name"],
            trim: true,
            unique: true
        },
        description: {
            type: String,
            required: [true, "Please Enter product Description"],
        },
        price: {
            type: Number,
            required: [true, "Please Enter product Price"],
            maxLength: [8, "Price cannot exceed 8 characters"],
        },
        images: [
            {
                public_id: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        ],
        category: {
            type: String,
            required: [true, "Please Enter Product Category"],
        },
        stock: {
            type: Number,
            required: [true, "Please Enter product Stock"],
            maxLength: [4, "Stock cannot exceed 4 characters"],
            default: 1,
        },
        numOfReviews: {
            type: Number,
            default: 0,
        },
        reviews: [
            {
                user: {
                    type: mongoose.Schema.ObjectId,
                    ref: "User",
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                rating: {
                    type: Number,
                    required: true,
                },
                comment: {
                    type: String,
                    required: true,
                },
                userImage: {
                    type: String,
                    default: "",
                }
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        size: {
            type: Array
        },
        color: {
            type: Array
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        ratings: {
            type: Number,
            default: 0,
        },
    },
    {
        // zennimce timestamp true yazmasagda olar cunki yuxarda created at yazmisiq
        timestamps: true
    },
)
module.exports = mongoose.model("Product", ProductSchema);
