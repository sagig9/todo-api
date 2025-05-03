const Task = require('../models/Task');

class TaskRepository {
  async create(taskData) {
    return await Task.create(taskData);
  }
  
  async getAll() {
    return await Task.find({});
  }

  async getById(id) {
    return await Task.findById(id);
  }

  async update(id, data) {
    return await Task.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Task.findByIdAndDelete(id);
  }
}

module.exports = new TaskRepository();
