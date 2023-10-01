import createUserSchemaModel from "../models/createUserSchemaModel.js";
import mongoose from "mongoose";

export const createUserSchemaController = async (req, res) => {
    try {
        const { userId, depositDate, securityDeposit, totalAmount, balance, interestRate, profitBalance, paymentDate, paymentStatus } = req.body;

        // Check if the "balance" field is present in the request body
        if (balance === undefined) {
            return res.status(400).json({ error: 'Balance is required' });
        }

        // const depositDateValue = new Date(depositDate);
        // const paymentDateValue = new Date(paymentDate);

        // const formattedDepositDate = depositDateValue.toLocaleDateString('en-US'); // Format as 'yy-mm-dd'
        // const formattedPaymentDate = paymentDateValue.toLocaleDateString('en-US'); // Format as 'yy-mm-dd'

        const depositDateValue = new Date(depositDate);
        const paymentDateValue = new Date(paymentDate);

        // Format the dates as 'yy-mm-dd'
        const formattedDepositDate = depositDateValue.toLocaleDateString('en-US', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
        });
        const formattedPaymentDate = paymentDateValue.toLocaleDateString('en-US', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
        });


        // Check if the userId is a valid ObjectId; if not, convert it

        const user = await new createUserSchemaModel({
            userId: userId.toString(),// Use the converted or original value
            depositDate: formattedDepositDate,
            securityDeposit,
            totalAmount,
            balance,  // Make sure "balance" is included here
            interestRate,
            profitBalance,
            paymentDate: formattedPaymentDate,
            paymentStatus,
        }).save();

        // Format the dates in the response
        const formattedUser = {
            ...user.toObject(),
            depositDate: formattedDepositDate,
            paymentDate: formattedPaymentDate,
        };

        res.status(201).send({
            success: true,
            message: "Create User Schema inserted Successfully",
            user: formattedUser, // Send the formatted user data in the response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
