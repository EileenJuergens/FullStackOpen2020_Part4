/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});


blogsRouter.post('/', async (request, response, next) => {
  if (!request.body.title || !request.body.author) {
    response.status(400);
    response.json({ error: 'title and / or author missing' });
    response.end();
  } else {
    try {
      const users = await User.find({});
      const randomIndex = Math.floor(Math.random() * users.length);
      const user = users[randomIndex];

      const blog = new Blog({
        url: request.body.url,
        title: request.body.title,
        author: request.body.author,
        user: user._id,
        likes: request.body.likes || 0,
      });

      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      response.status(201);
      response.json(savedBlog);
    } catch (error) {
      next(error);
    }
  }
});


blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204);
  response.end();
});


blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    likes: request.body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.status(200);
  response.json(updatedBlog);
});


module.exports = blogsRouter;
