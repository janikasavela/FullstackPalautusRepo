import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9; /* Vaalea tausta parillisille riveille */
  }
`;

const StyledCell = styled.td`
  padding: 8px;
  text-align: ${(props) => props.align || 'left'};
  color: #333;
`;

const UserLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: #0056b3;
  }
`;

const User = ({ user }) => {
  return (
    <StyledRow>
      <StyledCell>
        <UserLink to={`/users/${user.id}`}>{user.username}</UserLink>
      </StyledCell>
      <StyledCell align="center">{user.blogs.length}</StyledCell>
    </StyledRow>
  );
};

export default User;
