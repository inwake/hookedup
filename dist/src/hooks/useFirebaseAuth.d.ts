export default function useFirebaseAuth({ firebase, firebaseReady }: {
    firebase: any;
    firebaseReady: any;
}): {
    user: null;
    userReady: boolean;
    signInWithEmailAndPassword: (email: any, password: any) => any;
    signUpWithEmailAndPassword: (email: any, password: any) => any;
    loading: boolean;
    error: null;
};
