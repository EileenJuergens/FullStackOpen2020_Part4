const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'The Verge',
    author: 'Katarina Peterson',
    url: 'https://www.theverge.com/',
    likes: 3,
    id: '5ed4cf238cddb1068728e7dc',
  },
  {
    title: 'TechCrunch',
    author: 'Antoni Barron',
    url: 'https://techcrunch.com',
    likes: 10,
    id: '5ed4cf648cddb1068728e7dd',
  },
  {
    title: 'Engadget',
    author: 'Alexia Simon',
    url: 'https://www.engadget.com/',
    likes: 5,
    id: '5ed4cf918cddb1068728e7de',
  },
  {
    title: 'The Next Web',
    author: 'Jenson Grant',
    url: 'https://thenextweb.com/',
    likes: 5,
    id: '5ed4cfc78cddb1068728e7df',
  },
  {
    title: 'CNET',
    author: 'Cassandra Sloan',
    url: 'https://www.cnet.com/news/',
    likes: 16,
    id: '5ed4d0108cddb1068728e7e0',
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObj = initialBlogs.map((blog) => new Blog(blog));
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

  expect(response.body.length).toBe(initialBlogs.length);
});

test('the unique identifier of each blog is names "id"', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
