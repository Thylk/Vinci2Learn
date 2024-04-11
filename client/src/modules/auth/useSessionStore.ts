import { create } from 'zustand';
import { User } from '../users/User.ts';

interface State {
  token: string | null;
  user: User | null;
}

interface Actions {
  setToken: (token: string | null) => void;
  setUser: (user: User) => void;
  removeToken: () => void;
  removeUser: () => void;
}

export const useSessionStore = create<State & Actions>((set) => ({
  token: null,
  user: null,
  setToken: (token) => {
    set({ token });
  },
  setUser: (user) => {
    set({ user });
  },
  removeToken: () => {
    set({ token: null });
  },
  removeUser: () => {
    set({ user: null });
  },
}));