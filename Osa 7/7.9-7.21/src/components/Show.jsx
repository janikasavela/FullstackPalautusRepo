import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ShowContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`;

const BlogItem = styled.div`
  padding: 10px;
  margin: 10px 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const StyledLink = styled(Link)`
  color: #007acc;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: #005fa3;
  }
`;

const Show = ({ blogs }) => {
  const sortedBlogs = blogs?.sort((a, b) => b.likes - a.likes) || [];

  return (
    <ShowContainer>
      <h2>Blogs</h2>
      {sortedBlogs.map((blog) => (
        <BlogItem key={blog.id}>
          <StyledLink to={`/${blog.id}`}>{blog.title}</StyledLink> by{' '}
          {blog.author}
        </BlogItem>
      ))}
    </ShowContainer>
  );
};

export default Show;
