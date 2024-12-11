const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.items);
router.get('/new-item', itemController.addItemForm);
router.post('/create-item', itemController.addItem);
router.get('/:id', itemController.viewItem);
router.get('/:id/edit', itemController.editItemForm);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem)

module.exports = router;