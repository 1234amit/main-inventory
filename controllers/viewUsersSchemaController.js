import createUserSchemaModel from "../models/createUserSchemaModel.js";
// import userModel from "../models/userModel.js";

export const viewUsersSchemaController = async (req, res) => {
    try {
        const { userId } = req.params; // Assuming userId is passed as a URL parameter
        console.log(userId);

        // Find the createUserSchema entries that match the provided userId
        const userSchemas = await createUserSchemaModel.find({ userId });

        if (!userSchemas) {
            return res.status(404).json({ error: 'User Schema not found' });
        }

        res.status(200).json(userSchemas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}