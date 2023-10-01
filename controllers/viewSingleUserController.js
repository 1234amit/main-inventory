import createUserSchemaModel from "../models/createUserSchemaModel.js";
// import userModel from "../models/userModel.js";

export const viewSingleUserController = async (req, res) => {
    // const userId = req.params.userId;

    const _id = req.params._id;
    console.log(_id)

    try {
        // Fetch the user based on the userId from the database
        // const user = await createUserSchemaModel.find({ userId: userId });

        // if (!user) {
        //     // Handle the case where the user is not found
        //     return res.status(404).json({ message: 'User not found' });
        // }

        const userSchema = await createUserSchemaModel.findById(_id);

        if (!userSchema) {
            // Handle the case where the user schema is not found
            return res.status(404).json({ message: 'User schema not found' });
        }

        // Send the user data as a JSON response
        res.json({ user: userSchema });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
