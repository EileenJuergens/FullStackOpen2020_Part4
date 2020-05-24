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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
