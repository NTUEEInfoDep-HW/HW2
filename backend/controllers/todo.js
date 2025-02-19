import TodoModel from "../models/todoModel.js";

// Get all todos
export const getTodos = async (req, res) => {
  try {
    // Find all todos
    const todos = await TodoModel.find({});
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Create a todo
export const createTodo = async (req, res) => {
  const { title } = req.body;

  // Check the title
  if (!title) {
    return res
      .status(400)
      .json({ message: "Title is required!" });
  }

  // Create a new todo
  try {
    const newTodo = await TodoModel.create({
      title,
      completed: false,
    });
    return res.status(201).json(newTodo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    // Check if the id is valid
    const existedTodo = await TodoModel.findById(id);
    if (!existedTodo) {
      return res.status(404).json({ message: "Todo not found!" });
    }

    // Update the todo
    if (completed !== undefined) existedTodo.completed = completed;

    // Save the updated todo
    await existedTodo.save();

    // Rename _id to id
    existedTodo.id = existedTodo._id;
    delete existedTodo._id;

    return res.status(200).json(existedTodo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the id is valid
    const existedTodo = await TodoModel.findById(id);
    if (!existedTodo) {
      return res.status(404).json({ message: "Todo not found!" });
    }
    // Delete the todo
    await TodoModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Todo deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
