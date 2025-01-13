import { create } from 'zustand';
import { User as FirebaseUser, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '@/firebaseConfig';


export type User = FirebaseUser;

type AuthState = {
    user: User | null;
    isInit: boolean;
    handleAuthStateChanged: (user: User | null) => void;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
    user: null,
    isInit: false,

    handleAuthStateChanged: (user: User | null) => {
        set({ user, isInit: true });
    },

    loginWithGoogle: async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({   
            prompt: "select_account "
        });

        const signInWithGooglePopup = () => signInWithPopup(firebaseAuth, provider);

        const { user } = await signInWithGooglePopup();
        
        if (user) {
            set({ user });
        }
    },

    logout: async () => {
        await firebaseAuth.signOut();
    }
}));
