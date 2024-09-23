// import http from 'http';

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello, World!\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { getUsers, createUser, getUserByEmail } from './controller/user.js';
import Blog from './models/blogModel.js';

const app = express();
const port = 3000;

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/users', getUsers);
app.post('/users', createUser);
app.get('/users/:email', getUserByEmail);


// FOR BLOG
// Create a new blog post
app.post('/blogs', async (req, res) => {
    const { title, content, author } = req.body;
  
    try {
      const newPost = new Blog({ title, content, author });
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ message: 'Error creating blog post', error });
    }
  });
  
  // Get all blog posts
  app.get('/blogs', async (req, res) => {
    try {
      const posts = await Blog.find();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving blog posts', error });
    }
  });
  
  // Get a single blog post by ID
  app.get('/blogs/:id', async (req, res) => {
    try {
      const post = await Blog.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving blog post', error });
    }
  });
  
  // Update a blog post by ID
  app.put('/blogs/:id', async (req, res) => {
    const { title, content, author } = req.body;
  
    try {
      const updatedPost = await Blog.findByIdAndUpdate(req.params.id, {
        title, content, author
      }, { new: true });
  
      if (!updatedPost) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
  
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: 'Error updating blog post', error });
    }
  });
  
  // Delete a blog post by ID
  app.delete('/blogs/:id', async (req, res) => {
    try {
      const deletedPost = await Blog.findByIdAndDelete(req.params.id);
      if (!deletedPost) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting blog post', error });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


