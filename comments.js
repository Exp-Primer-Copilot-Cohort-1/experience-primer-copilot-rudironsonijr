// Create web server

// Import the express module
const express = require('express');

// Import the comments module
const Comments = require('./../models/comments');

// Create a router object
const router = express.Router();

// Import the data
const comments = new Comments();

// GET /comments
router.get('/', (req, res) => {
    res.json(comments.getAll());
});

// GET /comments/:id
router.get('/:id', (req, res) => {
    const comment = comments.getById(req.params.id);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).json({ message: 'Comment not found' });
    }
});

// POST /comments
router.post('/', (req, res) => {
    const newComment = comments.create(req.body.name, req.body.content);
    res.status(201).json(newComment);
});

// PUT /comments/:id
router.put('/:id', (req, res) => {
    const updatedComment = comments.update(req.params.id, req.body.name, req.body.content);
    if (updatedComment) {
        res.json(updatedComment);
    } else {
        res.status(404).json({ message: 'Comment not found' });
    }
});

// DELETE /comments/:id
router.delete('/:id', (req, res) => {
    const deletedComment = comments.delete(req.params.id);
    if (deletedComment) {
        res.json(deletedComment);
    } else {
        res.status(404).json({ message: 'Comment not found' });
    }
});

// Export the router object
module.exports = router;