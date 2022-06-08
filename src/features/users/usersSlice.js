import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';

import { apiSlice } from '../api/apiSlice';

// const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

// const initialState = [];

export const selectUsersResult = apiSlice.endpoints.getUsers.select();

const emptyUsers = [];

export const selectAllUsers = createSelector(
  selectUsersResult,
  (usersResult) => usersResult?.data ?? emptyUsers
);

export const selectUserById = createSelector(
  selectAllUsers,
  (state, userId) => userId,
  (users, userId) => users.find((user) => user.id === userId)
);

// export const selectUserById = (state, userId) =>
//   state.users.find((user) => user.id === userId);

// export default usersSlice.reducer;
