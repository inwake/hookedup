export default function useFirebase(): {
    firebase: import("@react-native-firebase/app").ReactNativeFirebase.Module;
    firebaseReady: boolean;
    error: null;
};
