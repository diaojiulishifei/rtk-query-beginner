import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3600' }),
  tagTypes: ['Post', 'User'],
  endpoints: (builder) => ({
    // posts apis
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
    }),
    getPostsByUserId: builder.query({
      query: (userId) => `/posts?${userId}`,
    }),
    // add post
    addPost: builder.mutation({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
    // --------------
    // users apis
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['User'],
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsByUserIdQuery,
  useGetUsersQuery,
  useAddPostMutation,
  useGetPostByIdQuery,
  useGetUserByIdQuery,
} = apiSlice;
