export default function useFirebaseAuth({ firebaseReady }: {
    firebaseReady: any;
}): {
    auth: import("@react-native-firebase/app").ReactNativeFirebase.FirebaseModuleWithStaticsAndApp<import("@react-native-firebase/auth").FirebaseAuthTypes.Module, import("@react-native-firebase/auth").FirebaseAuthTypes.Statics>;
    user: null;
    error: null;
    loading: boolean;
    userReady: boolean;
    signInWithEmailAndPassword: (email: any, password: any) => void | Promise<void>;
    signUpWithEmailAndPassword: (email: any, password: any) => void | Promise<void>;
    findUserByEmail: (email: any) => void | Promise<any>;
};
