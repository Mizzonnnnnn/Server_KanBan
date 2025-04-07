import jwt from 'jsonwebtoken'

export const getAccesstoken = (payload: {
    _id: string;
    email: string;
    rule: number;
}) => {
    const token = jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: '1d' })
    return token;
}