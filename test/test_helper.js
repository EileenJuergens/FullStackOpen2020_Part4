const Blog = require('../models/blog');

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

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs;
};

module.exports = { initialBlogs, blogsInDb };
