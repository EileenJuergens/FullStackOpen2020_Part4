const blogsRouter = require('express').Router();
const Blog = require('../models/blog');


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});


blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
  });


  blog
    .save()
    .then((result) => {
      response.status(200);
      response.json(result);
    })
    .catch((error) => {
      next(error);
    });
});


module.exports = blogsRouter;
