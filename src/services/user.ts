import User from "../models/UserModel"
import bcrypt from "bcrypt";

interface UserData {
    email: string,
    password: string,
    name: string
}

const isExisted = async (email: string) => {
    const isExisted = await User.findOne({ email })
    return !!isExisted;
}

const hashPw = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}

const registerUser = async (data: UserData) => {
    const { email, password } = data;

    try {
        const Existed = await isExisted(email);

        if (Existed) {
            return {
                EC: 1,
                message: "Tài khoản đã tồn tại"
            }
        }

        // hash passwordpassword
        data.password = await hashPw(password);

        const newUser: any = new User(data);
        await newUser.save();

        // chuyển thành đối tượng js thuần túy để không còn bị moogose quản lý
        const userObject = newUser.toObject();

        // xóa đi pw khi thông báo thông tintin
        delete userObject.password;

        return {
            EC: 0,
            message: "Successfully Registered",
            data: userObject
        }

    } catch (error: any) {
        console.log('Error register service: ', error);
        return {
            EC: -1,
            message: "Something wrongs in service resgister",
        }
    }
}

const loginUser = async (data: UserData) => {
    const { email, password } = data;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return {
                message: "Taì khoản không tồn tại",
            }
        }

        const pw = await bcrypt.compare(password, user.password);

        if (!pw) {
            return {
                message: "Password sai sai saiisaiisiiasiifdisa",
            }
        }

        const objectUser: any = user.toObject();
        delete objectUser.password;

        return {
            message: "Successfully Login",
            data: objectUser
        }
    } catch (error: any) {
        console.log('Error register service: ', error);
        return {
            message: "Something wrongs in service resgister",
        }
    }
}

export { registerUser, loginUser };