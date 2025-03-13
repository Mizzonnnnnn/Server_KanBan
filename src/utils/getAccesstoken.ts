import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export const getAccesstoken = async (payload: {
    _id: string;
    email: string;
    rule: number;
}) => {
    const token = await jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: '3d' })
    return token;
}