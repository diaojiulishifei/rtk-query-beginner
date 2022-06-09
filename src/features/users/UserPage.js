import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { selectUserById } from '../users/usersSlice';
import { Link, useParams } from 'react-router-dom';
import { useGetPostsQuery } from '../api/apiSlice';
import { useMemo } from 'react';

const UserPage = () => {
  const { userId } = useParams();

  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const selectPostsForUser = useMemo(() => {
    const emptyArray = [];
    // Return a unique selector instance for this page so that
    // the filtered results are correctly memoized
    return createSelector(
      (result) => result.data,
      (result, userId) => userId,
      (data, userId) =>
        data?.filter((post) => post.userId === Number(userId)) ?? emptyArray
    );
  }, []);

  // Use the same posts query, but extract only part of its data
  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: (result) => ({
      // We can optionally include the other metadata fields from the result here
      ...result,
      // Include a field called `postsForUser` in the hook result object,
      // which will be a filtered list of posts
      postsForUser: selectPostsForUser(result, userId),
    }),
  });

  const postTitles = postsForUser?.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>{postTitles}</ol>
    </section>
  );
};

export default UserPage;
