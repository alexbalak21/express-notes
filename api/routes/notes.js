const express = require('express');
const router = express.Router();
const db = require('../db');

// Helper to decode BLOB content
const decodeNote = (note) => ({
  ...note,
  content: note.content?.toString('utf8') || ''
});

// CREATE a new note
router.post('/', async (req, res) => {
  const { title, content, user_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)',
      [title, Buffer.from(content, 'utf8'), user_id || null]
    );
    res.status(201).json({ id: result.insertId, title, content, user_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all notes
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM notes');
    const decoded = rows.map(decodeNote);
    res.json(decoded);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ a single note
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM notes WHERE id = ?', [req.params.id]);
    if (rows.length) {
      res.json(decodeNote(rows[0]));
    } else {
      res.status(404).send('Note not found');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a note
router.put('/:id', async (req, res) => {
  const { title, content, user_id } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE notes SET title = ?, content = ?, user_id = ? WHERE id = ?',
      [title, Buffer.from(content, 'utf8'), user_id || null, req.params.id]
    );
    result.affectedRows
      ? res.json({ id: req.params.id, title, content, user_id })
      : res.status(404).send('Note not found');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a note
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM notes WHERE id = ?', [req.params.id]);
    result.affectedRows
      ? res.status(204).send()
      : res.status(404).send('Note not found');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
