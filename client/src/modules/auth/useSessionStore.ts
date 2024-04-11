import { create } from 'zustand';

export interface Session {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

interface State {
  session: Session | null;
}

interface Actions {
  setSession: (session: Session | null) => void;
  removeSession: () => void;
}

export const useSessionStore = create<State & Actions>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  removeSession: () => set({ session: null }),
}));
