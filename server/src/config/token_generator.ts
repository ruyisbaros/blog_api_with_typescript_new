import jwt from "jsonwebtoken";

export const generateActiveToken = (payload: object) => {

    return jwt.sign(payload, process.env.JWT_ACTIVE_KEY!, { expiresIn: "30m" })
}
export const generateAccessToken = (payload: object) => {

    return jwt.sign(payload, process.env.JWT_ACCESS_KEY!, { expiresIn: "14d" });
}
export const generateReFreshToken = (payload: object) => {

    return jwt.sign(payload, process.env.JWT_REFRESH_KEY!, { expiresIn: "15d" })
}