import { Request } from "express"
import prisma from "../db"

export async function getProductUpdates(req, res) {
    const userId = req.user.id
    const productId = req.params.productId
    const productsWithUpdates = await prisma.product.findFirst({
        where: {
            id: productId,
            belongsToId: userId
        },
        include: {
            updates: true
        }
    })
    res.status(200).json({ data: productsWithUpdates?.updates })
}
export async function getUpdate(req, res) {
    const updateId = req.params.id
    const userId = req.user.id
    const update = await prisma.update.findFirst({
        where: {
            id: updateId,
            product: {
                belongsToId: userId
            }
        }
    })
    res.status(200).json({ data: update })
}
export async function createUpdate(req, res) {
    const productId: string = req.params.productId
    try {
        const update = await prisma.update.create({
            data: {
                body: req.body.body,
                title: req.body.title,
                productId
            }
        })
        res.status(201).json({ data: update })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export async function updateUpdate(req, res) {
    const updateId = req.params.id
    const userId = req.user.id
    const updatedUpdate = await prisma.update.update({
        where: {
            id: updateId,
            product: {
                belongsToId: userId
            }
        },
        data: {
            title: req.body.title,
            body: req.body.body,
            status: req.body.status,
            version: req.body.version
        }
    })
    res.status(200).json({ data: updatedUpdate })
}

export async function deleteUpdate(req, res) {
    const updateId = req.params.id
    const userId = req.user.id
    const deletedUpdate = await prisma.update.delete({
        where: {
            id: updateId,
            product: {
                belongsToId: userId
            }
        }
    })
    res.status(200).json({ data: deletedUpdate })
}