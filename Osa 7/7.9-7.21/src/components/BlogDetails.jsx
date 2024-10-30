import { useParams } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext';
import noteService from '../services/blogs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '../contexts/UserContext';
import { useState } from 'react';
import styled from 'styled-components';

const BlogContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
`;

const BlogTitle = styled.h2`
  font-size: 1.8em;
  margin-bottom: 10px;
  color: #333;
`;

const BlogInfo = styled.p`
  font-size: 1em;
  margin: 5px 0;
`;

const ActionButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #dc3545;
  &:hover {
    background-color: #c82333;
  }
`;

const CommentsSection = styled.div`
  margin-top: 20px;
`;

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentItem = styled.li`
  background-color: #f1f1f1;
  margin: 5px 0;
  padding: 8px;
  border-radius: 5px;
`;

const CommentForm = styled.form`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const CommentInput = styled.input`
  padding: 8px;
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const BlogDetails = ({ blogs }) => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);
  const { showNotificationWithTimeout } = useNotification();
  const queryClient = useQueryClient();
  const { user } = useUser();
  const [comment, setComment] = useState('');

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const updateBlogMutation = useMutation({
    mutationFn: (id) => noteService.update(id, { likes: blog.likes + 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      showNotificationWithTimeout(
        `"${blog.title}" was liked successfully`,
        'notification',
        5000,
      );
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: noteService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      showNotificationWithTimeout(
        `"${blog.title}" was deleted successfully`,
        'notification',
        5000,
      );
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: (newComment) => noteService.addComment(blog.id, newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      showNotificationWithTimeout(
        'Comment added successfully',
        'notification',
        5000,
      );
    },
    onError: (error) => {
      showNotificationWithTimeout(`Error: ${error}`, 'error', 5000);
    },
  });

  const handleLike = () => {
    updateBlogMutation.mutate(blog.id);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete ${blog.title} ?`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    addCommentMutation.mutate(comment);
    setComment('');
  };

  return (
    <BlogContainer>
      <BlogTitle>{blog.title}</BlogTitle>
      <BlogInfo>Author: {blog.author}</BlogInfo>
      <BlogInfo>URL: {blog.url}</BlogInfo>
      <BlogInfo>
        Likes: {blog.likes}{' '}
        <ActionButton onClick={handleLike}>like</ActionButton>
      </BlogInfo>
      <BlogInfo>
        Added by: {blog.user ? blog.user.username : 'Unknown'}
      </BlogInfo>
      {user?.username === blog.user?.username && (
        <DeleteButton onClick={handleDelete}>delete</DeleteButton>
      )}

      <CommentsSection>
        <h3>Comments</h3>
        <CommentList>
          {blog?.comments.map((comment, index) => (
            <CommentItem key={index}>{comment}</CommentItem>
          ))}
        </CommentList>
        <CommentForm onSubmit={handleComment}>
          <CommentInput
            type="text"
            value={comment}
            name="Comment"
            placeholder="Add a comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <ActionButton type="submit">add comment</ActionButton>
        </CommentForm>
      </CommentsSection>
    </BlogContainer>
  );
};

export default BlogDetails;
