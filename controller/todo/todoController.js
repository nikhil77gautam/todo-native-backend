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
    console.log(req.body);
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }

    // Extract file names from uploaded files (if any)
    const todoThumbnail =
      req.files?.todoThumbnail?.map((file) => file.filename) || [];

    const todo = await Todo.create({
      user: req.user._id,
      title,
      description,
      todoThumbnail,
    });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Failed to add todo." });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Ensure at least one field is provided
    if (!title && !description && !req.files?.todoThumbnail) {
      return res.status(400).json({
        message:
          "At least one field (title, description, or thumbnail) is required.",
      });
    }

    // Extract file names from uploaded files
    const todoThumbnail =
      req.files?.todoThumbnail?.map((file) => file.filename) || [];

    // Build update object dynamically
    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (todoThumbnail.length > 0) updateFields.todoThumbnail = todoThumbnail;

    // Find and update the todo
    const todo = await Todo.findByIdAndUpdate(id, updateFields, { new: true });

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
