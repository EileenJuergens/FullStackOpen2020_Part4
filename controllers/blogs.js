const blogsRouter = require('express').Router();
const Blog = require('../models/blog');


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});


blogsRouter.post('/', async (request, response, next) => {
  if (request.body.title === undefined || request.body.author === undefined) {
    response.status(400);
    response.json({ error: 'title and / or author missing' });
    response.end();
  } else {
    try {
      const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0,
      });

      const savedBlog = await blog.save();
      response.status(200);
      response.json(savedBlog);
    } catch (exception) {
      next(exception);
    }
  }
});


module.exports = blogsRouter;
