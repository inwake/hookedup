export default function useFirebaseAuth({ firebaseReady }: {
    firebaseReady: any;
}): {
    user: null;
    userReady: boolean;
    signInWithEmailAndPassword: (email: any, password: any) => void | Promise<void>;
    signUpWithEmailAndPassword: (email: any, password: any) => void | Promise<void>;
    loading: boolean;
    error: null;
};
