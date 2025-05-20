const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/', todoController.getTodos);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.toggleTodo);
router.put('/:id/edit', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;