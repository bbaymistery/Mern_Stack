const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

/**  @desc    Get logged in user notes*/
/**  @route   GET /api/notes*/
/**  @access  Private */
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

//todo @description     Create single Note
//todo @route           GET /api/notes/create
//todo @access          Private
const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
  } else {
    const note = new Note({
      user: req.user._id, //burdaki req.user.id authmiddlewareden
      title,
      content,
      category,
    });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
});

//todo @description     Fetch single Note
//todo @route           GET /api/notes/:id
//todo @access          Public
const getNoteById = asyncHandler(async (req, res) => {
  const noteId = await Note.findById(req.params.id);

  if (noteId) {
    res.json(noteId);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});

//todo @desc    Update a note
//todo @route   PUT /api/notes/:id
//todo @access  Private
const updateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

////todo  @description     Delete single Note
////todo  @route           GET /api/notes/:id
////todo  @access          Private
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    await note.remove();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
});

module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote };
