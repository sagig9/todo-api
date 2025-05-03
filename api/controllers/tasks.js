const taskRepository = require('../repositories/taskRepository');

module.exports = {

    create: async (req, res) => {
        const task = await taskRepository.create(req.body);
        req.app.get('io').emit('taskCreated', task); // notify all clients
        res.status(201).json(task);
    },

    list: async (req, res) => {
        const tasks = await taskRepository.getAll();
        res.json(tasks);
    },

    update: async (req, res) => {
        const updatedTask = await taskRepository.update(req.params.id, req.body);
        req.app.get('io').emit('taskUpdated', updatedTask);
        res.json(updatedTask);
    },

    delete: async (req, res) => {
        const deletedTask = await taskRepository.delete(req.params.id);
        req.app.get('io').emit('taskDeleted', deletedTask);
        res.json(deletedTask);
    },
};