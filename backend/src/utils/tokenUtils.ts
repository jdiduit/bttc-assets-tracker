import jwt, {sign} from "jsonwebtoken";

export const validateAccessToken = (
    token: string
): any => {
    try {
        return jwt.verify(token, process.env.JWT_TOKEN)
    } catch (e) {
        console.log(e)
        return null
    }
}

export const generateToken = (
    userId: string
): any => {
    try {
        return sign({subject: userId}, process.env.JWT_TOKEN, {expiresIn: "1h"})
    } catch (e) {
        console.log(e)
        return null
    }
}
