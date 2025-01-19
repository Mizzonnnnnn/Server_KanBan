import User from "../models/UserModel"
import bcrypt from "bcrypt";

const register = async (req: any, res: any) => {
    const body = req.body;
    const { email, name, password } = body;

    try {
        const isExisted = await User.findOne({ email })
        if (isExisted) {
            return res.status(200).json({
                message: `Tài khoản đã tồn tại`
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        body.password = hashPassword;

        const newUser: any = new User(body);
        await newUser.save();

        delete newUser.password;

        console.log(newUser);

        res.status(201).json({
            message: "Successfully Registered",
            data: newUser
        })
    } catch (error: any) {
        console.log(error)
        res.status(404).json({
            message: error.message
        })
    }
}

export {
    register
}