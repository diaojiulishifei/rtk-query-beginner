import { useSelector } from 'react-redux';
import { selectUserById } from '../users/usersSlice';

const PostAuthor = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, Number(userId)));
  //   console.log(user);

  return <span>by {user ? user.name : 'Unknown author'}</span>;
};
export default PostAuthor;
