import user from "../models/UserModel"

const register = async (req: any, res: any) => {
    const body = req.body;
    console.log("Check body: ", body);

    try {
        let data = await user.create({ body })
        console.log("Check data: ", data);
        res.status.json({
            message: "Successfully Registered",
            data: body
        })
    } catch (error: any) {
        console.log("Check: ", error)
        res.status(404).json({
            message: error.message
        })
    }
}

export {
    register
}