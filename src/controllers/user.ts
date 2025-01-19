import { registerUser } from "../services/user";

const register = async (req: any, res: any) => {
    const body = req.body;

    try {
        const user = await registerUser(body);
        if (user && user.EC === 0) {
            return res.status(201).json({
                EC: user.EC,
                message: user.message,
                data: user.data
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

export {
    register
}