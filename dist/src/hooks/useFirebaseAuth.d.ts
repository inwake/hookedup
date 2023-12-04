export default function useFirebaseAuth({ firebaseReady }: {
    firebaseReady: any;
}): {
    auth: import("@react-native-firebase/app").ReactNativeFirebase.FirebaseModuleWithStaticsAndApp<import("@react-native-firebase/auth").FirebaseAuthTypes.Module, import("@react-native-firebase/auth").FirebaseAuthTypes.Statics>;
    user: null;
    additionalUserInfo: null;
    loading: boolean;
    error: null;
    userReady: boolean;
    signInWithEmailAndPassword: (email: any, password: any) => void | Promise<any>;
    signUpWithEmailAndPassword: (email: any, password: any) => void | Promise<any>;
    signOut: () => void | Promise<any>;
    findUserByEmail: (email: any) => void | Promise<any>;
};
