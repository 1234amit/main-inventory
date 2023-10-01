import userModel from "../models/userModel.js";

export const viewUsersControllers = async (req, res) => {
    try {
        const users = await userModel.find(); // Fetch all users from the database
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}