import { useSelector } from 'react-redux';
import { selectUserById } from '../users/usersSlice';
import { selectAllPosts, selectPostsByUser } from '../posts/postsSlice';
import { Link, useParams } from 'react-router-dom';
import { useGetUserByIdQuery, useGetPostsByUserIdQuery } from '../api/apiSlice';

const UserPage = () => {
  const { userId } = useParams();
  const { data: user } = useGetUserByIdQuery(userId);

  const { data: postsForUser } = useGetPostsByUserIdQuery(userId);

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
