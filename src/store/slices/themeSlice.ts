import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
}

const savedMode = localStorage.getItem('theme') as ThemeMode | null;

if (savedMode === 'dark') {
  document.documentElement.classList.add('dark');
}

const initialState: ThemeState = {
  mode: savedMode ?? 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.mode);
      document.documentElement.classList.toggle('dark', state.mode === 'dark');
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const selectThemeMode = (state: RootState) => state.theme.mode;

export default themeSlice.reducer;
