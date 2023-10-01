import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userId: {
            type: String, // You can adjust the data type to match your requirements
            unique: true, // Ensure uniqueness if needed
            required: true, // Mark it as required if necessary
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },

        zipcode: {
            type: String,
            required: true,
        },

        passportNumber: {
            type: String,
            required: true,
        },

        answer: {
            type: String,
            required: true,
        },

        role: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model("users", userSchema);