import { userModel } from "../models/user.js";

export async function getAllUsers(req, res) {
    try {
        let data = await userModel.find();
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot get all users", message: err.message });
    }
}
export async function getById(req, res) {
    const { id } = req.params;
    try {
        let data = await userModel.findById(id);
        if (!data) {
            return res.status(404).json({ title: "cannot find by id", message: "User with such id not found" });
        }
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot get user by id", message: err.message });
    }
}

export async function update(req, res) {
    const { id } = req.params;
    try {
        let data = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!data) {
            return res.status(404).json({ title: "cannot update user", message: "User with such id not found" });
        }
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot update user", message: err.message });
    }
}

export async function payfine(req, res) {
    let { id } = req.params;
    let { sum } = req.body;
    try {
        let data = await userModel.findByIdAndUpdate(id,{fine:{$inc: -sum}},{new:true});
        if (!data) {
            return res.status(404).json({ title: "cannot find by id", message: "User with such id not found" });
        }
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot update user", message: err.message });
    }
}

export async function add_signUp(req, res) {
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.phone) {
        return res.status(400).json({ title: "missing parameters", message: "username, email, password, and phone are required" });
    }
    try {
        let newUser = new userModel(req.body);
        await newUser.save();
        res.json(newUser);
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "cannot add user", message: err.message });
    }
}

export async function getUserByUsernamePassword_Login(req, res) {
    try {
        let data = await userModel.findOne({
            password: req.body.password,
            username: req.body.username
        });

        if (!data) {
            return res.status(404).json({
                title: "cannot find user with such details",
                message: "wrong username or password"
            });
        }

        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            title: "cannot log in user",
            message: err.message
        });
    }
}