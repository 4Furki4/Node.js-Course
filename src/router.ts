import { Router } from 'express'
import { body, oneOf, validationResult } from 'express-validator'
import { validateRequest } from './modules/validation'
const router = Router()

/**
 * Product Routes
 */
router.get('/product', (req, res) => {
    res.status(200).json({ message: "Hello World" })
})
router.get('/product/:id', () => { })
router.put('/product/:id', [
    body('name').isString(), validateRequest
], (req, res) => {
    res.status(200).json({ message: "Hello World" })
})
router.post('/product', [
    body('name').isString(), validateRequest
], () => { })
router.delete('/product/:id', () => { })
/**
 * Product Routes
 */
router.get('/update', () => { })
router.get('/update/:id', () => { })
router.put('/update/:id', [
    body('title').optional().isString(),
    body('body').optional().isString(),
    body('status').isIn(['IN_PROGRESS', 'LIVE', 'DEPRECATED', 'ARCHIVED']).optional(),
    body('version').optional().isString(), validateRequest
],
    () => { })
router.post('/update', [
    body('title').exists().isString(),
    body('body').exists().isString(), validateRequest
],
    () => { })
router.delete('/update/:id', () => { })

/**
 * Update Point Routes
 */
router.get('/update-point', () => { })
router.get('/update-point/:id', () => { })
router.put('/update-point/:id', [
    body('name').optional().isString(),
    body('description').optional().isString(), validateRequest
],
    () => { }
)
router.post('/update-point', [
    body('name').exists().isString(),
    body('description').exists().isString(), validateRequest
],
    () => { })
router.delete('/update-point/:id', () => { })

export default router