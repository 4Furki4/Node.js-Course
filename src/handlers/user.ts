import prisma from "../db";
import { comparePasswordsAsync, createJWT, hashPasswordAsync } from "../modules/auth";

export async function createNewUser(req, res, next) {
    const receivedUser = req.body
    if (!receivedUser.username || !receivedUser.password) {
        res.status(400).json({
            message: "Please provide a username and password"
        })
        return
    }
    try {
        const user = await prisma.user.create({
            data: {
                username: receivedUser.username,
                password: await hashPasswordAsync(receivedUser.password)
            }
        })
        const token = createJWT(user)
        res.status(201).json({
            token
        })
    } catch (error) {
        if (error.code === "P2002") {
            error.type = "validation"
            error.message = "Username already exists"
            return next(error)
        }
        next(new Error("Something went wrong"))
    }
}

export async function signin(req, res) {
    const receivedUser = req.body
    if (!receivedUser.username || !receivedUser.password) {
        res.status(400).json({
            message: "Please provide a username and password"
        })
        return
    }
    const user = await prisma.user.findUnique({
        where: {
            username: receivedUser.username,
        },
    })
    if (!user) {
        res.status(400).json({
            message: "User not found"
        })
        return
    }
    const passwordMatches = await comparePasswordsAsync(receivedUser.password, user.password)
    if (!passwordMatches) {
        res.status(401).json({
            message: "Password is incorrect"
        })
        return
    }
    const token = createJWT(user)
    res.status(201).json({
        token
    })
}