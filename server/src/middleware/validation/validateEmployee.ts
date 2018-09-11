import { check } from 'express-validator/check'

export default [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name is missing')
    .trim(),
]
