import { Router } from 'express'
import { body } from 'express-validator'
import { validateRequest } from './modules/validation'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './handlers/product'
import { createUpdate, deleteUpdate, getProductUpdates, getUpdate, updateUpdate } from './handlers/update'
const router = Router()

/**
 * Product Routes
 */
router.get('/product', getProducts)

router.get('/product/:id', getProduct)

router.put('/product/:id', [
    body('name').isString(), validateRequest
], updateProduct)

router.post('/product', [
    body('name').trim().isString().withMessage("Product name must be a string")
        .isLength({
            max: 255,
            min: 1,
        }).withMessage("Product name must be between 1 and 255 characters long"),
    validateRequest
], createProduct)

router.delete('/product/:id', deleteProduct)


/**
 * Update Routes
 */
router.get('/:productId/update', getProductUpdates)
router.get('/update/:id', getUpdate)
router.put('/update/:id', [
    body('title').optional().isString(),
    body('body').optional().isString(),
    body('status').isIn(['IN_PROGRESS', 'LIVE', 'DEPRECATED', 'ARCHIVED']).optional(),
    body('version').optional().isString(), validateRequest
],
    updateUpdate)
router.post('/:productId/update', [
    body('title').exists().isString(),
    body('body').exists().isString(), validateRequest
],
    createUpdate)
router.delete('/update/:id', deleteUpdate)

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