export default function useAppVisibility(): {
    activeState: import("react-native").AppStateStatus;
    isActive: boolean;
    foreground: boolean;
    background: boolean;
};
