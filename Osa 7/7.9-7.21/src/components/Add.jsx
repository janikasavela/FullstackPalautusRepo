import styled from 'styled-components';
import { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import noteService from '../services/blogs';

const FormContainer = styled.form`
  max-width: 500px;
  margin: auto;
  margin-top: 30px;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: #005fa3;
  }
`;

const Add = ({ handleNewBlog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const { showNotificationWithTimeout } = useNotification();
  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: noteService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      showNotificationWithTimeout(
        `${newBlog.title} was added successfully`,
        'notification',
        5000,
      );
      setNewTitle('');
      setNewAuthor('');
      setNewUrl('');
      handleNewBlog();
    },
    onError: (error) => {
      showNotificationWithTimeout(`Error: ${error.message}`, 'error', 5000);
    },
  });

  const addBlog = (e) => {
    e.preventDefault();
    const newBlog = { title: newTitle, author: newAuthor, url: newUrl };
    newBlogMutation.mutate(newBlog);
  };

  return (
    <FormContainer onSubmit={addBlog}>
      <h2>Add a new blog post</h2>
      <label>Title</label>
      <InputField
        data-testid="title"
        type="text"
        value={newTitle}
        placeholder="Add title"
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <label>Author</label>
      <InputField
        data-testid="author"
        type="text"
        value={newAuthor}
        placeholder="Add author"
        onChange={(e) => setNewAuthor(e.target.value)}
      />
      <label>URL</label>
      <InputField
        data-testid="url"
        type="text"
        value={newUrl}
        placeholder="Add URL"
        onChange={(e) => setNewUrl(e.target.value)}
      />
      <Button type="submit">Add</Button>
    </FormContainer>
  );
};

export default Add;
