import { Router } from 'express'

const router = Router()

/**
 * Product Routes
 */
router.get('/product', (req, res) => {
    res.status(200).json({ message: "Hello World" })
})
router.get('/product/:id', () => { })
router.put('/product/:id', () => { })
router.post('/product', () => { })
router.delete('/product/:id', () => { })
/**
 * Product Routes
 */
router.get('/product', () => { })
router.get('/product/:id', () => { })
router.put('/product/:id', () => { })
router.post('/product', () => { })
router.delete('/product/:id', () => { })

/**
 * Update Point Routes
 */
router.get('/product-point', () => { })
router.get('/product-point/:id', () => { })
router.put('/product-point/:id', () => { })
router.post('/product-point', () => { })
router.delete('/product-point/:id', () => { })

export default router