import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { Spinner } from '../../components/Spinner';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGetPostQuery } from '../api/apiSlice';

const SinglePostPage = () => {
  const { postId } = useParams();

  const { data: post, isFetching } = useGetPostQuery(Number(postId));

  if (isFetching) {
    return (
      <section>
        <Spinner text="Loading..." />
      </section>
    );
  }

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
