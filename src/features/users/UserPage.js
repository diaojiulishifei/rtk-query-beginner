import { useSelector } from 'react-redux';
import { selectUserById } from '../users/usersSlice';
import { Link, useParams } from 'react-router-dom';
import { useGetPostsByUserIdQuery } from '../api/apiSlice';

const UserPage = () => {
  const { userId } = useParams();

  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const { data: postsForUser } = useGetPostsByUserIdQuery(Number(userId));

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
