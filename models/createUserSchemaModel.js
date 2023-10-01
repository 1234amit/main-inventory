import mongoose from 'mongoose';

// Define the CreateUserSchema
const createUserSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.Mixed, // Mixed type for flexibility
        required: true,// Reference to User model's ObjectId
        ref: 'users', // Name of the referenced model
    },

    depositDate: {
        type: Date,
        required: true,
    },

    securityDeposit: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true, // "balance" field is marked as required
    },
    interestRate: {
        type: Number,
        required: true,
    },
    profitBalance: {
        type: Number,
        required: true,
    },
    paymentDate: {
        type: Date,
        required: true,
    },

    paymentStatus: {
        type: String,
        required: true,
    },



},
    {
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.createdAt;
                delete ret.updatedAt;
                delete ret.__v;
                // Format date fields as 'yy-mm-dd'
                ret.depositDate = ret.depositDate.toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' });
                ret.paymentDate = ret.paymentDate.toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' });
            },
        },
    }

);

// Create a CreateUser model using the schema
const createUserSchemaModel = mongoose.model("createUserSchemaModel", createUserSchema);

export default createUserSchemaModel;
