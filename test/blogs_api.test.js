const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);


beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObj = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArr = blogObj.map((blog) => blog.save());

  await Promise.all(promiseArr);
});


test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body.length).toBe(helper.initialBlogs.length);
});


test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs');
  const titles = response.body.map((blog) => blog.title);

  expect(titles).toContain('The Next Web');
});


test('the unique identifier of each blog is names "id"', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});


test('a new blog is added successfully', async () => {
  const newBlog = {
    title: 'Test blog title 1',
    author: 'Test author 1',
    url: 'https://www.test.com',
    likes: 3,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).toContain('Test blog title 1');
});


test('if the likes property is missing, the default value should be 0', async () => {
  const newBlog = {
    title: 'Test blog title 2',
    author: 'Test author 2',
    url: 'https://www.test.com',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blog = await Blog.findOne({ title: 'Test blog title 2' });
  expect(blog.likes).toBe(0);
});


afterAll(() => {
  mongoose.connection.close();
});
