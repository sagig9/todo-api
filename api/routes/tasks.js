const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks');

router.get('/', taskController.list);
router.post('/', taskController.create);
router.patch('/:id', taskController.update);
router.delete('/:id', taskController.delete);

module.exports = router;
