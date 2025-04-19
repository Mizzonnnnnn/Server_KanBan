import User from "../models/UserModel"
import bcrypt from "bcrypt";
import { generatorRandomText } from "../utils/generatorRandomText";

interface UserData {
    email: string,
    password: string,
    name: string
}

const isExisted = async (email: string) => {
    const isExisted: any = await User.findOne({ email })
    return isExisted;
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
            return { EC: 1, message: "Taì khoản không tồn tại" }
        }

        const pw = await bcrypt.compare(password, user.password);

        if (!pw) {
            return { EC: 1, message: "Đăng nhập thất bại, vui lòng kiểm tra lại Email/Password " }
        }

        const objectUser: any = user.toObject();
        delete objectUser.password;

        return {
            EC: 0,
            message: "Successfully Login",
            data: objectUser
        }
    } catch (error: any) {
        console.log('Error register service: ', error);
        return {
            EC: -1,
            message: "Something wrongs in service resgister",
        }
    }
}

const loginUserGoogle = async (data: UserData) => {
    const { email } = data;
    try {
        const Existed: any = await isExisted(email);

        if (Existed) {
            const user: any = Existed.toObject();
            delete user.password;

            return {
                EC: 0,
                message: "Successfully Login",
                data: user
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(generatorRandomText(6), salt);
        data.password = hashPassword;

        const newUser: any = new User(data);
        await newUser.save();

        const userObject = newUser.toObject();
        delete userObject.password;

        return {
            EC: 0,
            message: "Successfully Login",
            data: userObject
        }

    } catch (error: any) {
        console.log('Error login service: ', error);
        return {
            EC: -1,
            message: "Lỗi đăng nhập với Google !!!",
        }
    }
}
export { registerUser, loginUser, loginUserGoogle };