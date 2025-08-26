import shortUrlModel from "../models/shortUrl.model.js";
import userModel from "../models/user.model.js";

export const findUserByEmail = async (email) => {
    return await userModel.findOne({email});
}

export const findUserById = async (id) => {
    return await userModel.findById(id)
}

export const createUser = async (name,email,password) => {
    const new_user = new userModel({
        name,
        email,
        password
    })

    await new_user.save();
    return new_user;
}

export const findUrlsByUserId = async (id) => {
    return await shortUrlModel.find({user: id});
}
