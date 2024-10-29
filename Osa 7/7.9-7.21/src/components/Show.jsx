import BlogDetails from './BlogDetails';
import { useNotification } from '../contexts/NotificationContext';
import { useQuery } from '@tanstack/react-query';
import noteService from '../services/blogs';

const Show = () => {
  const { showNotificationWithTimeout } = useNotification();

  const {
    data: blogs,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: noteService.getAll,
  });

  // Logataan haetut blogit
  console.log('Fetched blogs:', blogs);
  if (isPending) {
    return <div>loading data...</div>;
  }

  if (isError) {
    showNotificationWithTimeout(`Error fetching blogs`, 'error', 5000);
  }

  const sortedBlogs = blogs?.sort((a, b) => b.likes - a.likes) || [];

  return (
    <>
      <h2>Blogs</h2>
      {sortedBlogs.map((blog) => (
        <BlogDetails key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default Show;
