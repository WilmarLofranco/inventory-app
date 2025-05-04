const { body } = require('express-validator');

const itemValidator = [
    body('item')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Item name is required'),

    body('category')
    .trim()
    .escape()
    .isIn(['furniture', 'electronics', 'accessories', 'office supplies'])
    .notEmpty()
    .withMessage('Invalid Category'),

    body('quantity')
    .trim()
    .escape()
    .isInt({min:1})
    .notEmpty()
    .withMessage('Quantity must be more than 0'),

    body('price')
    .trim()
    .escape()
    .isFloat({min:0.01})
    .notEmpty()
    .withMessage('Price must be a valid number'),
]

module.exports = itemValidator;