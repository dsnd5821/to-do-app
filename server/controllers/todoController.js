const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

exports.createTodo = async (req, res) => {
    try {
      console.log('Received data:', req.body); // Add this line for debugging
      const newTodo = new Todo({ text: req.body.text, completed: false });
      const saved = await newTodo.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error('Error saving todo:', err);
      res.status(500).json({ error: 'Failed to create todo' });
    }
  };  
  
  exports.toggleTodo = async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) return res.status(404).json({ error: 'Todo not found' });
      todo.completed = !todo.completed;
      await todo.save();
      res.json(todo);
    } catch (err) {
      res.status(500).json({ error: 'Failed to toggle todo' });
    }
  };
  
  exports.deleteTodo = async (req, res) => {
    try {
      await Todo.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete todo' });
    }
  };
  
  exports.updateTodo = async (req, res) => {
    const { text } = req.body;
    try {
      const updated = await Todo.findByIdAndUpdate(
        req.params.id,
        { text },
        { new: true }
      );
      if (!updated) return res.status(404).json({ error: 'Todo not found' });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Update failed' });
    }
  };
  