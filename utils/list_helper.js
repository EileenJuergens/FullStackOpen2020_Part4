const dummy = (blogs) => (
  Array.isArray(blogs)
    ? 1
    : undefined
);


const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  if (blogs.length === 1) {
    return blogs[0].likes;
  }

  if (blogs.length > 1) {
    const initialValue = 0;
    return blogs.reduce((acc, curr) => {
      return acc + curr.likes;
    }, initialValue);
  }
};


const favoriteBlog = (blogs) => {
  const maxValue = Math.max(...blogs.map((blog) => blog.likes), 0);
  const favoriteBlogs = blogs.filter((blog) => blog.likes === maxValue);
  return favoriteBlogs[0];
};


const mostBlogs = (blogs) => {
  const authors = [];
  blogs.map((blog) => authors.push(blog.author));
  const allAuthors = Array.from(new Set(authors));

  const authorsBlogs = [];
  allAuthors.map((author, i) => {
    const counter = blogs.filter((blog) => blog.author === allAuthors[i]).length;
    authorsBlogs.push({ author, blogs: counter });
  });

  const maxValue = Math.max(...authorsBlogs.map((author) => author.blogs));
  const authorWithMostBlogs = authorsBlogs.filter((obj) => obj.blogs === maxValue);

  return authorWithMostBlogs[0];
};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
