//itemsRoutes.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const controller = require('../controllers/itemsController');
const itemValidator = require('../validators/itemValidator');

router.get('/', asyncHandler(controller.getItems));
router.get('/search', asyncHandler(controller.searchItem));

router.get('/add', asyncHandler(controller.addItemGet));
router.post('/add', itemValidator, asyncHandler(controller.addItemPost));

router.get('/edit/:id', asyncHandler(controller.editItemGet));
router.post('/edit/:id', itemValidator, asyncHandler(controller.editItemPost));

router.post('/delete/:id', asyncHandler(controller.deleteItem));

module.exports = router;