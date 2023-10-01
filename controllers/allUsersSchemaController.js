// import createUserSchemaModel from '../models/createUserSchemaModel.js';

import createUserSchemaModel from "../models/createUserSchemaModel.js";


export const allUsersSchemaController = async (req, res) => {
    try {
        const { user } = req;

        console.log("User Role:", user ? user.role : "No User Found"); // Log the user's role

        if (user?.role === 1) {
            const allUserSchemas = await createUserSchemaModel.find();
            console.log("users:", allUserSchemas)
            return res.status(200).json(allUserSchemas);
        } else {
            return res.status(403).json({ error: 'Access denied' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
