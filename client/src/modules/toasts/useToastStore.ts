import { create } from 'zustand';
import { Toast } from './Toast.ts';

interface State {
  toasts: Toast[];
}

interface Actions {
  addToast: (toast: Toast) => void;
  removeToast: (index: number) => void;
}

export const useToastStore = create<State & Actions>((set) => ({
  toasts: [] as Toast[],
  addToast: (toast: Toast) => {
    set((state) => ({ toasts: [...state.toasts, toast] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t !== toast) }));
    }, 3000);
  },
  removeToast: (index: number) => {
    set((state) => ({ toasts: state.toasts.filter((_, i) => i !== index) }));
  },
}));