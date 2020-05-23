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

module.exports = {
  dummy,
  totalLikes,
};
