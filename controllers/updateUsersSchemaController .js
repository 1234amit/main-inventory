import createUserSchemaModel from "../models/createUserSchemaModel.js";

export const updateUsersSchemaController = async (req, res) => {
    try {
        const { user } = req;
        // const { userId } = req.params; // Extract userId from route parameters
        const { _id } = req.params;
        console.log(_id)

        // Check if the user has the required role
        if (user?.role === 1) {
            // Find the user schema by userId and update it
            // const updatedUserSchema = await createUserSchemaModel.findOneAndUpdate(
            //     { userId: userId }, // Find by userId
            //     req.body, // Update with the request body
            //     { new: true } // Return the updated document
            // );

            const updatedUserSchema = await createUserSchemaModel.findOneAndUpdate(
                { _id: _id }, // Find by _id
                req.body, // Update with the request body
                { new: true } // Return the updated document
            );

            if (!updatedUserSchema) {
                return res.status(404).json({ error: 'User schema not found' });
            }

            return res.status(200).json(updatedUserSchema);
        } else {
            return res.status(403).json({ error: 'Access denied' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
