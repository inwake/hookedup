export default function useFirebaseAuth({ firebaseReady }: {
    firebaseReady: any;
}): {
    auth: import("@react-native-firebase/app").ReactNativeFirebase.FirebaseModuleWithStaticsAndApp<import("@react-native-firebase/auth").FirebaseAuthTypes.Module, import("@react-native-firebase/auth").FirebaseAuthTypes.Statics>;
    user: null;
    userReady: boolean;
    signInWithEmailAndPassword: (email: any, password: any) => void | Promise<void>;
    signUpWithEmailAndPassword: (email: any, password: any) => void | Promise<void>;
    verifyEmailExists: (email: any) => void | Promise<any>;
    loading: boolean;
    error: null;
};
