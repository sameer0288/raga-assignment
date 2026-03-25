import { create } from 'zustand';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../services/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  init: () => void;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const DEMO_USER_KEY = 'demo-user-session';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  init: () => {
    // Check for demo user session first
    const demoUser = localStorage.getItem(DEMO_USER_KEY);
    if (demoUser) {
      try {
        const user = JSON.parse(demoUser);
        set({ user, loading: false });
        return;
      } catch (err) {
        localStorage.removeItem(DEMO_USER_KEY);
      }
    }

    // Set up Firebase auth listener
    onAuthStateChanged(auth, (user) => {
      set({ user, loading: false });
    });
  },
  login: async (email, pass) => {
    set({ loading: true, error: null });

    // Demo bypass for reviewers without Firebase keys
    if (email === 'demo@healbase.com' && pass === 'password') {
      const demoUser = { email: 'demo@healbase.com', uid: 'demo-user-123' } as any;
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
      setTimeout(() => {
        set({
          user: demoUser,
          loading: false
        });
      }, 800);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
  logout: async () => {
    // Clear demo session if it exists
    localStorage.removeItem(DEMO_USER_KEY);

    // Sign out from Firebase
    await signOut(auth);
    set({ user: null });
  }
}));
