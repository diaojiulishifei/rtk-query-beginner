import { useSelector } from 'react-redux';
import { useGetUserByIdQuery, useGetUsersQuery } from '../api/apiSlice';
import { selectAllUsers } from '../users/usersSlice';

const PostAuthor = ({ userId }) => {
  const { data: user } = useGetUserByIdQuery(userId);
  //   console.log(user);

  return <span>by {user ? user.name : 'Unknown author'}</span>;
};
export default PostAuthor;
