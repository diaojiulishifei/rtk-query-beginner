import { createSelector } from '@reduxjs/toolkit';

import { apiSlice } from '../api/apiSlice';

/* Temporarily ignore adapter - we'll use this again shortly
const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()
*/

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

/* Temporarily ignore selectors - we'll come back to this later
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state) => state.users)
*/

// export default usersSlice.reducer;
