import { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import noteService from '../services/blogs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '../contexts/UserContext';

const BlogDetails = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { showNotificationWithTimeout } = useNotification();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const updateBlogMutation = useMutation({
    mutationFn: (id) => noteService.update(id, { likes: blog.likes + 1 }),
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      showNotificationWithTimeout(
        `"${blog.title}" was liked successfully`,
        'notification',
        5000,
      );
    },
    onError: (error) => {
      showNotificationWithTimeout(
        `Error occurred when updating data. ERROR: ${error}`,
        'error',
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
    onError: (error) => {
      showNotificationWithTimeout(
        `Error occured when deleting data. ERROR: ${error}`,
        'error',
        5000,
      );
    },
  });

  const handleLike = () => {
    updateBlogMutation.mutate(blog.id);
    setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete ${blog.title} ?`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };

  return (
    <div>
      <span>
        "{blog.title}" by {blog.author}{' '}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </span>
      {showDetails && (
        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
          <p>URL: {blog.url}</p>
          <p>
            Likes: {blog.likes} <button onClick={handleLike}>like</button>
          </p>
          <p>Added by: {blog.user ? blog.user.username : 'Unknown'}</p>
          <p></p>
        </div>
      )}

      {user.username === blog.user?.username && (
        <button onClick={handleDelete}>delete</button>
      )}
    </div>
  );
};

export default BlogDetails;
