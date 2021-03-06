/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});


blogsRouter.post('/', async (request, response) => {
  const { body } = request;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    response
      .status(401)
      .json({ error: 'token missing or invalid' })
      .end();
  } else if (!body.title || !body.author) {
    response
      .status(401)
      .json({ error: 'title and / or author missing' })
      .end();
  } else {
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      url: body.url,
      title: body.title,
      author: body.author,
      user: user._id,
      likes: body.likes || 0,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response
      .status(201)
      .json(savedBlog);
  }
});


blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response
      .status(200)
      .json(blog);
  } else {
    response
      .status(404)
      .end();
  }
});


blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const blog = await Blog.findById(id);

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    response
      .status(401)
      .json({ error: 'token missing or invalid' })
      .end();
  }

  if (blog.user.toString() !== decodedToken.id) {
    response
      .status(401)
      .json({ error: 'not authorized' })
      .end();
  }

  if (blog.user.toString() === decodedToken.id) {
    const deletedBlog = await Blog.findByIdAndRemove(id);

    response
      .status(204)
      .json(deletedBlog);
  }
});


blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    likes: request.body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response
    .status(200)
    .json(updatedBlog);
});


module.exports = blogsRouter;
