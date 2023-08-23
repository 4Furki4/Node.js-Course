import { validationResult } from "express-validator";
import { CustomRequest } from "../../index";
export function validateRequest(req: CustomRequest, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}