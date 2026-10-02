const Note = require('../models/Note');
const Purchase = require('../models/Purchase');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// @desc    Get all notes (with search, category, sort)
// @route   GET /api/notes
// @access  Public
const getNotes = async (req, res) => {
  try {
    const { search, category, sort } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    let sortOptions = { createdAt: -1 };
    if (sort === 'price-low') {
      sortOptions = { price: 1 };
    } else if (sort === 'price-high') {
      sortOptions = { price: -1 };
    } else if (sort === 'oldest') {
      sortOptions = { createdAt: 1 };
    }

    const notes = await Note.find(query).sort(sortOptions);

    let purchasedSet = new Set();
    let hasFullAccess = false;

    if (req.user) {
      const isAdminUser = req.user.role === 'admin' || (req.user.email && req.user.email.toLowerCase() === 'gopal.x235@gmail.com');
      const userDoc = await User.findById(req.user._id);
      const userHasAllAccess = userDoc?.hasAllAccess || false;

      if (isAdminUser || userHasAllAccess) {
        hasFullAccess = true;
      } else {
        const userPurchases = await Purchase.find({ userId: req.user._id, status: 'completed' });
        userPurchases.forEach((p) => {
          if (p.itemType === 'all-access') hasFullAccess = true;
          if (p.noteId) purchasedSet.add(p.noteId.toString());
        });
      }
    }

    const notesWithPurchaseState = notes.map((n) => {
      const nObj = n.toObject();
      return {
        ...nObj,
        isPurchased: hasFullAccess || purchasedSet.has(n._id.toString()),
      };
    });

    res.json(notesWithPurchaseState);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Failed to fetch notes', error: error.message });
  }
};

// @desc    Get note details by ID
// @route   GET /api/notes/:id
// @access  Public (Optional auth checks if purchased)
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    let isPurchased = false;
    if (req.user) {
      const isAdminUser = req.user.role === 'admin' || (req.user.email && req.user.email.toLowerCase() === 'gopal.x235@gmail.com');
      const userDoc = await User.findById(req.user._id);
      const userHasAllAccess = userDoc?.hasAllAccess || false;

      if (isAdminUser || userHasAllAccess) {
        isPurchased = true;
      } else {
        const allAccessPurchase = await Purchase.findOne({
          userId: req.user._id,
          itemType: 'all-access',
          status: 'completed',
        });
        if (allAccessPurchase) {
          isPurchased = true;
        } else {
          const purchase = await Purchase.findOne({
            userId: req.user._id,
            noteId: note._id,
            status: 'completed',
          });
          if (purchase) {
            isPurchased = true;
          }
        }
      }
    }

    res.json({
      ...note.toObject(),
      isPurchased,
    });
  } catch (error) {
    console.error('Error fetching note details:', error);
    res.status(500).json({ message: 'Failed to fetch note details', error: error.message });
  }
};

// @desc    Create a new note (Admin only)
// @route   POST /api/notes
// @access  Private/Admin
const createNote = async (req, res) => {
  try {
    const { title, description, category, price, pages, whatYouWillLearn } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: 'Please provide required fields: title, description, category' });
    }

    let thumbnail = '';
    let pdfUrl = '';

    if (req.files) {
      if (req.files.thumbnail && req.files.thumbnail[0]) {
        thumbnail = `/uploads/${req.files.thumbnail[0].filename}`;
      }
      if (req.files.pdf && req.files.pdf[0]) {
        pdfUrl = `/uploads/${req.files.pdf[0].filename}`;
      }
    }

    if (!pdfUrl && req.body.pdfUrl) {
      pdfUrl = req.body.pdfUrl;
    }
    if (!thumbnail && req.body.thumbnail) {
      thumbnail = req.body.thumbnail;
    }

    if (!pdfUrl) {
      pdfUrl = '/uploads/notes/test_1rupee_handbook.pdf';
    }
    if (!thumbnail) {
      thumbnail = 'https://images.unsplash.com/photo-1516116211223-4c7141467477?w=600&auto=format&fit=crop&q=60';
    }

    let parsedLearn = [];
    if (whatYouWillLearn) {
      if (Array.isArray(whatYouWillLearn)) {
        parsedLearn = whatYouWillLearn;
      } else if (typeof whatYouWillLearn === 'string') {
        try {
          parsedLearn = JSON.parse(whatYouWillLearn);
        } catch (e) {
          parsedLearn = whatYouWillLearn.split('\n').filter((item) => item.trim() !== '');
        }
      }
    }

    const note = await Note.create({
      title,
      description,
      category,
      price: Math.min(Math.max(Number(price) || 0, 0), 149),
      pages: Number(pages) || 1,
      thumbnail,
      pdfUrl,
      whatYouWillLearn: parsedLearn,
    });

    res.status(201).json(note);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Failed to create note', error: error.message });
  }
};

// @desc    Update note (Admin only)
// @route   PUT /api/notes/:id
// @access  Private/Admin
const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    const { title, description, category, price, pages, whatYouWillLearn } = req.body;

    if (title) note.title = title;
    if (description) note.description = description;
    if (category) note.category = category;
    if (price !== undefined) note.price = Math.min(Math.max(Number(price) || 0, 0), 149);
    if (pages !== undefined) note.pages = Number(pages);

    if (req.files) {
      if (req.files.thumbnail && req.files.thumbnail[0]) {
        note.thumbnail = `/uploads/${req.files.thumbnail[0].filename}`;
      }
      if (req.files.pdf && req.files.pdf[0]) {
        note.pdfUrl = `/uploads/${req.files.pdf[0].filename}`;
      }
    }

    if (req.body.pdfUrl) note.pdfUrl = req.body.pdfUrl;
    if (req.body.thumbnail) note.thumbnail = req.body.thumbnail;

    if (whatYouWillLearn) {
      if (Array.isArray(whatYouWillLearn)) {
        note.whatYouWillLearn = whatYouWillLearn;
      } else if (typeof whatYouWillLearn === 'string') {
        try {
          note.whatYouWillLearn = JSON.parse(whatYouWillLearn);
        } catch (e) {
          note.whatYouWillLearn = whatYouWillLearn.split('\n').filter((item) => item.trim() !== '');
        }
      }
    }

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Failed to update note', error: error.message });
  }
};

// @desc    Delete note (Admin only)
// @route   DELETE /api/notes/:id
// @access  Private/Admin
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    await note.deleteOne();
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Failed to delete note', error: error.message });
  }
};

// @desc    Download / Access purchased Note PDF securely
// @route   GET /api/notes/:id/download
// @access  Private (Must have purchased note OR be Admin)
const downloadNotePdf = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    const isAdminUser = req.user.role === 'admin' || (req.user.email && req.user.email.toLowerCase() === 'gopal.x235@gmail.com');

    // Verify ownership or Admin role
    if (!isAdminUser) {
      const purchase = await Purchase.findOne({
        userId: req.user._id,
        noteId: note._id,
        status: 'completed',
      });
      if (!purchase) {
        return res.status(403).json({ message: 'Access denied: You must purchase this note first' });
      }
    }

    if (!note.pdfUrl) {
      return res.status(404).json({ message: 'PDF resource file missing' });
    }

    // If local file path
    if (note.pdfUrl.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '..', note.pdfUrl);
      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
      }
    }

    // Direct URL redirect or fallback response
    return res.json({ pdfUrl: note.pdfUrl });
  } catch (error) {
    console.error('Download note error:', error);
    res.status(500).json({ message: 'Error accessing resource', error: error.message });
  }
};

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  downloadNotePdf,
};
