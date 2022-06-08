import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// import { addNewPost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

import { useAddPostMutation, useGetUsersQuery } from '../api/apiSlice';

const AddPostForm = () => {
  //   const dispatch = useDispatch();

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  // const [addRequestStatus, setAddRequestStatus] = useState('idle');

  // const users = useSelector(selectAllUsers);
  const { data: users } = useGetUsersQuery();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const [addNewPost, { isLoading: isAddingNewPost, error }] =
    useAddPostMutation();

  const canSave =
    [title, content, userId].every(Boolean) && isAddingNewPost === false;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        // setAddRequestStatus('pending');
        await addNewPost({
          title,
          body: content,
          userId: Number(userId),
          reactions: { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 },
        }).unwrap();

        setTitle('');
        setContent('');
        setUserId('');
        navigate('/');
      } catch (err) {
        console.error('Failed to save the post', err);
      } finally {
        // setAddRequestStatus('idle');
      }
    }
  };

  const usersOptions = users?.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  if (isAddingNewPost) {
    return <p>"Adding new Post"</p>;
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};
export default AddPostForm;
