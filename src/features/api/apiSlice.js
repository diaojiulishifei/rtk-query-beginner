import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3600' }),
  tagTypes: ['Post', 'User'],
  endpoints: (builder) => ({
    // posts apis
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: (result = [], error, arg) => [
        { type: 'Post', id: 'LIST' },
        ...result.map(({ id }) => ({ type: 'Post', id })),
      ],
    }),
    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
      providesTags: (result, error, arg) => [{ type: 'Post', id: arg }],
    }),
    getPostsByUserId: builder.query({
      query: (userId) => `/posts?userId=${userId}`,
    }),
    addNewPost: builder.mutation({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: {
          ...post,
          userId: Number(post.userId),
          date: new Date().toISOString(),
          reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          },
        },
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    editPost: builder.mutation({
      query: (initialPost) => ({
        url: `/posts/${initialPost.id}`,
        method: 'PATCH',
        body: { ...initialPost, date: new Date().toISOString() },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg }],
    }),
    // ------------------------
    getUsers: builder.query({
      query: () => '/users',
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useGetPostsByUserIdQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
} = apiSlice;
