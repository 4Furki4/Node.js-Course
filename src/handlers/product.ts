import prisma from "../db"
/**
 * This function returns a list of products that belong to the user
 * @param req request object from express
 * @param res response object from express
 * @returns a list of products that belong to the user
 */
export async function getProducts(req, res) {
    const userId = req.user.id
    const userWithProducts = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            products: true
        }
    })
    res.status(200).json({ data: userWithProducts?.products })
}

export async function getProduct(req, res) {
    const userId = req.user.id
    const productId = req.params.id
    const product = await prisma.product.findFirst({
        where: {
            id: productId,
            belongsToId: userId
        }
    })
    res.status(200).json({ data: product })
}

export async function createProduct(req, res) {
    const userId = req.user.id
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            belongsToId: userId,
        }
    })
    res.status(201).json({ data: product })
}

export async function updateProduct(req, res) {
    const productId = req.params.id
    const userId = req.user.id
    const updatedProduct = await prisma.product.update({
        where: {
            id_belongsToId: {
                id: productId,
                belongsToId: userId
            }
        },
        data: {
            name: req.body.name
        }
    })
    res.status(200).json({ data: updatedProduct })
}

export async function deleteProduct(req, res) {
    const productId = req.params.id
    const userId = req.user.id
    const deletedProduct = await prisma.product.delete({
        where: {
            id_belongsToId: {
                id: productId,
                belongsToId: userId
            }
        }
    })
    res.status(200).json({ data: deletedProduct })
}