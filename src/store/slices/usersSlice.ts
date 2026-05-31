import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services/userService';
import type { RootState } from '../store';
import type { User, CreateUserData, UpdateUserData } from '../../types/user';

interface UsersState {
  items: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  return await userService.getAllUsers();
});

export const addUser = createAsyncThunk(
  'users/add',
  async (data: CreateUserData) => {
    return await userService.createUser(data);
  }
);

export const editUser = createAsyncThunk(
  'users/edit',
  async (data: UpdateUserData) => {
    return await userService.updateUser(data);
  }
);

export const removeUser = createAsyncThunk(
  'users/remove',
  async (id: number) => {
    await userService.deleteUser(id);
    return id;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to fetch users';
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.items.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.items = state.items.filter((u) => u.id !== action.payload);
      });
  },
});

export const selectAllUsers = (state: RootState) => state.users.items;
export const selectUsersStatus = (state: RootState) => state.users.status;
export const selectUsersError = (state: RootState) => state.users.error;

export default usersSlice.reducer;
