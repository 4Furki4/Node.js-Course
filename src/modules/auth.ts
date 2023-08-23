import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
export function createJWT(user) {
    const token: String = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET)
    return token
}
export function protect(req, res, next) {
    const bearer = req.headers.authorization
    if (!bearer) {
        res.status(401).json({
            message: "You need to be logged in to visit this route"
        })
        return
    }

    const [, token] = bearer.split(" ")
    if (!token) {
        res.status(401).json({
            message: "not a valid token"
        })
        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({
            message: "not a valid token"
        })
        return
    }
}


export function comparePasswordsAsync(plainPassword, hashedPassword): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword)
}

export function hashPasswordAsync(password): Promise<string> {
    return bcrypt.hash(password, 5)
}

