import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3600' }),
  tagTypes: ['Posts', 'Users'],
  endpoints: (builder) => ({
    // posts apis
    getPosts: builder.query({
      query: () => '/posts',
      transformResponse: (response) =>
        response.sort((a, b) => {
          return b.id - a.id;
        }),
      providesTags: ['Posts'],
    }),
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
    }),
    getPostsForUserByUserId: builder.query({
      query: (userId) => `/posts?${userId}`,
    }),
    // add post
    addPost: builder.mutation({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Posts'],
    }),
    // --------------
    // users apis
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: (response) =>
        response.sort((a, b) => {
          return b.id - a.id;
        }),
      providesTags: ['Users'],
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsForUserByUserIdQuery,
  useGetUsersQuery,
  useAddPostMutation,
  useGetPostByIdQuery,
  useGetUserByIdQuery,
} = apiSlice;
