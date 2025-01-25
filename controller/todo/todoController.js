import Todo from "../../model/todo/todoModel.js";

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch todos." });
  }
};

export const addTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }

    const todo = await Todo.create({ user: req.user._id, title, description });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Failed to add todo." });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title && !description) {
      return res.status(400).json({
        message: "At least one field (title or description) is required.",
      });
    }

    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Failed to update todo." });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Failed to delete todo." });
  }
};
