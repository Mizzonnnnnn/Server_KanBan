import { loginUser, registerUser } from "../services/user";
import { getAccesstoken } from "../utils/getAccesstoken";

const register = async (req: any, res: any) => {
    const body = req.body;

    try {
        const user = await registerUser(body);

        if (user && user.EC === 0) {
            const token = await getAccesstoken({
                _id: user.data._id,
                email: user.data.email,
                rule: 1
            })

            return res.status(201).json({
                EC: user.EC,
                message: user.message,
                data: { ...user.data, token }
            });
        }

        return res.status(400).json({
            EC: user.EC,
            message: user.message,
        });

    } catch (error: any) {
        console.log("Error register controller: ", error)
        res.status(500).json({
            message: error.message || "Internal Server Error"
        })
    }
}

const login = async (req: any, res: any) => {
    const body = req.body;

    try {
        const user = await loginUser(body);

        if (user.data) {
            const token = await getAccesstoken({
                _id: user.data._id,
                email: user.data.email,
                rule: user.data.rule ?? 1
            })

            return res.status(201).json({
                message: user.message,
                data: { ...user.data, token }
            });
        }

        return res.status(400).json({
            message: user.message,
        });

    } catch (error: any) {
        console.log("Error register controller: ", error)
        res.status(40).json({
            message: error.message || "Internal Server Error"
        })
    }
}

export {
    register,
    login
}