import PostsExcerpt from './PostsExcerpt';
import { useGetPostsQuery } from '../api/apiSlice';
import { useMemo } from 'react';
import { Spinner } from '../../components/Spinner';
import classNames from 'classnames';

const PostsList = () => {
  const {
    data: posts = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetPostsQuery();
  // console.log('isLoading', isLoading);
  // console.log('isFetching', isFetching);
  // console.log('isSuccess', isSuccess);

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice();
    // Sort posts in descending chronological order
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date));
    return sortedPosts;
  }, [posts]);

  let content;
  if (isLoading) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    const renderedPosts = sortedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));

    const containerClassname = classNames('posts-container', {
      disabled: isFetching,
    });

    content = <div className={containerClassname}>{renderedPosts}</div>;
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch Posts</button>
      {content}
    </section>
  );
};
export default PostsList;
