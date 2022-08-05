import dbConnect from "../../utils/dbConnect";
import UserModel from "../models/User";

export const findUserByEmail = async (email: string) => {
    if (email === null){
        throw new Error("Email cannot be null!");
    }

    await dbConnect();

    const user = await UserModel.findOne({email: email});

    if (!user){
        throw new Error(`Failed to find user with email ${email}`);
    }

    return {
        success: true,
        user: user
    }
}

export const createUserWithEmail = async (email: string) => {
    if (email === null){
        throw new Error("Email cannot be null!");
    }

    await dbConnect();

    const user = await UserModel.create({email: email});

    return {
        success: true,
        user: user
    }

}