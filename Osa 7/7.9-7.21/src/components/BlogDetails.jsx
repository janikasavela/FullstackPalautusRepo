import { useParams } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext';
import noteService from '../services/blogs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '../contexts/UserContext';

const BlogDetails = ({ blogs }) => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);
  const { showNotificationWithTimeout } = useNotification();
  const queryClient = useQueryClient();
  const { user } = useUser();

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

  const handleLike = () => {
    updateBlogMutation.mutate(blog.id);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete ${blog.title} ?`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>URL: {blog.url}</p>
      <p>
        Likes: {blog.likes} <button onClick={handleLike}>like</button>
      </p>
      <p>Added by: {blog.user ? blog.user.username : 'Unknown'}</p>
      {user?.username === blog.user?.username && (
        <button onClick={handleDelete}>delete</button>
      )}
    </div>
  );
};

export default BlogDetails;
