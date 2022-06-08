import { useSelector } from 'react-redux';
import { selectPostIds, getPostsStatus, getPostsError } from './postsSlice';
import PostsExcerpt from './PostsExcerpt';
import { useGetPostsQuery } from '../api/apiSlice';

const PostsList = () => {
  //   const orderedPostIds = useSelector(selectPostIds);
  //   const postStatus = useSelector(getPostsStatus);
  //   const error = useSelector(getPostsError);

  const { data: posts, isLoading, error } = useGetPostsQuery();

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (posts) {
    content = posts.map((post) => <PostsExcerpt key={post.id} post={post} />);
  } else if (error) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return <section>{content}</section>;
};
export default PostsList;
