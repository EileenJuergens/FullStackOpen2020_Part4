const dummy = (blogs) => (
  Array.isArray(blogs)
    ? 1
    : undefined
);


const totalLikes = (blogs) => {
  let number;

  if (blogs.length === 0) number = 0;
  if (blogs.length === 1) number = blogs[0].likes;
  if (blogs.length > 1) number = blogs.reduce((acc, curr) => acc + curr.likes, 0);

  return number;
};


const favoriteBlog = (blogs) => {
  const maxValue = Math.max(...blogs.map((blog) => blog.likes), 0);
  const favoriteBlogs = blogs.filter((blog) => blog.likes === maxValue);
  return favoriteBlogs[0];
};


const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author);
  const allAuthors = Array.from(new Set(authors));

  const authorsBlogs = allAuthors.map((author) => {
    const counter = blogs.filter((blog) => blog.author === author).length;
    return { author, blogs: counter };
  });

  const maxValue = Math.max(...authorsBlogs.map((author) => author.blogs));
  const authorWithMostBlogs = authorsBlogs.filter((obj) => obj.blogs === maxValue);

  return authorWithMostBlogs[0];
};


const mostLikes = (blogs) => {
  const authors = blogs.map((blog) => blog.author);
  const allAuthors = Array.from(new Set(authors));

  const authorsLikes = allAuthors.map((author) => {
    const allBlogsFromOneAuthor = blogs.filter((blog) => blog.author === author);
    const amount = totalLikes(allBlogsFromOneAuthor);
    return { author, likes: amount };
  });

  const maxValue = Math.max(...authorsLikes.map((author) => author.likes));
  const authorWithMostLikes = authorsLikes.filter((obj) => obj.likes === maxValue);

  return authorWithMostLikes[0];
};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
