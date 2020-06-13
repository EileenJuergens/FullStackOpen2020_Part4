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


describe('when there is initially some blogs are saved', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');
    const titles = response.body.map((blog) => blog.title);
    expect(titles).toContain('The Next Web');
  });
});


describe('viewing a specific blog', () => {
  test('the unique identifier of each blog is called "id"', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });
});


describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
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
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain('Test blog title 1');
  });

  test('if likes are missing, default value is 0', async () => {
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

  test('if author or title are missing, respond is 400 (Bad Request)', async () => {
    const newBlog = {
      url: 'https://www.test.com',
      likes: 3,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  });
});


describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
