const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  return blogs.reduce((favorite, current) => {
    return current.likes > favorite.likes ? current : favorite;
  });
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  //kirjoittajien maarat, palauttaa objektin jossa avaimet kirjoittajien nimiä ja arvot blogiensa määrät
  const authorCounts = _.countBy(blogs, "author");

  //muutetaan taulukoksi joka sisaltaa avaimet ja arvot
  const authors = Object.entries(authorCounts).map(([author, count]) => ({
    author,
    blogs: count,
  }));

  //haetaan kirjoittaja, kenellä eniten blogeja
  const mostBlogsAuthor = _.maxBy(authors, "blogs");

  return mostBlogsAuthor;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  // lasketaan tykkäykset jokaiselle kirjoittajalle, lodash kirjaston reduce metodi ottaa taulukon joka läpikäydään ja palauttaa objektin joka sisaltaa avain arvopareja, author ja hänen tykkaykset
  /*  esim {
    "Michael Chan": 7,
    "Edsger W. Dijkstra": 17,
    "Robert C. Martin": 12
  }  */
  const likesCount = _.reduce(
    blogs,
    (acc, blog) => {
      acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
      return acc;
    },
    {}
  );

  //muutetaan taulukoksi joka sisaltaa avaimet ja arvot
  const authorsLikes = Object.entries(likesCount).map(([author, likes]) => ({
    author,
    likes,
  }));

  //haetaan kirjoittaja, kenellä eniten tykkäyksiä
  const mostLikesAuthor = _.maxBy(authorsLikes, "likes");

  return mostLikesAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
