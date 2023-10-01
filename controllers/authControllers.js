import userModel from "../models/userModel.js";
import { hashPassword } from './../helpers/authHelper.js';

import { comparePasswrd } from "../helpers/authHelper.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { userId, name, email, password, phone, address, answer, country, state, zipcode, passportNumber } = req.body;
        // validation
        if (!userId) {
            return res.send({ message: "user id is required " })
        }
        if (!name) {
            return res.send({ message: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone no is Required" });
        }
        if (!address) {
            return res.send({ message: "Address is Required" });
        }
        if (!country) {
            return res.send({ message: "country is Required" });
        }
        if (!state) {
            return res.send({ message: "state is Required" });
        }
        if (!zipcode) {
            return res.send({ message: "ZipCode is Required" });
        }

        if (!passportNumber) {
            return res.send({ message: "passportNumber is Required" });
        }

        if (!answer) {
            return res.send({ message: "Answer is Required" });
        }

        // check user
        const exisitingUser = await userModel.findOne({ email });
        // existing user
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register Please Login",
            });
        }

        // register user
        const hashedPassword = await hashPassword(password);
        // save
        const user = await new userModel({
            userId,
            name,
            email,
            phone,
            address,
            country,
            state,
            zipcode,
            passportNumber,
            password: hashedPassword,
            answer,
        }).save();

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Errro in Registeration",
            error,
        });
    }
}


// login controller
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email and password",
            });
        }
        // check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not register"
            });
        }

        const match = await comparePasswrd(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid password"
            });
        }

        // token
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                userId: user.userId,
                name: user.name,
                email: user.email,
                phone: user.phone,
                adddress: user.address,
                country: user.country,
                state: user.state,
                zipcode: user.zipcode,
                passportNumber: user.passportNumber,
                role: user.role,
            },
            token,
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        })
    }
}

// test controller
export const testController = (req, res) => {
    res.send("Protected Routes");
}


// forgot controller
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "Emai is required" });
        }
        if (!answer) {
            res.status(400).send({ message: "answer is required" });
        }
        if (!newPassword) {
            res.status(400).send({ message: "New Password is required" });
        }
        //check
        const user = await userModel.findOne({ email, answer });
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email Or Answer",
            });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
}