import { useSelector } from 'react-redux';
import { useGetUserByIdQuery, useGetUsersQuery } from '../api/apiSlice';
import { selectAllUsers, selectUserById } from '../users/usersSlice';

const PostAuthor = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));
  //   console.log(user);

  return <span>by {user ? user.name : 'Unknown author'}</span>;
};
export default PostAuthor;
